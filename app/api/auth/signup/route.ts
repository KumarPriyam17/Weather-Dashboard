import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';
import { signSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const db = await getDb();
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await db.run(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                email,
                hashedPassword
            );
        } catch (e: any) {
            if (e.message.includes('UNIQUE constraint failed')) {
                return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
            }
            throw e;
        }

        const user = await db.get('SELECT id, username FROM users WHERE username = ?', email);
        const token = await signSession({ id: user.id, username: user.username });

        cookies().set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
