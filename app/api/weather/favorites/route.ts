import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const favorites = await db.all('SELECT * FROM favorites WHERE user_id = ?', session.id);
    return NextResponse.json({ favorites });
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { city_name, latitude, longitude } = await request.json();
    if (!city_name || !latitude || !longitude) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const db = await getDb();
    await db.run(
        'INSERT INTO favorites (user_id, city_name, latitude, longitude) VALUES (?, ?, ?, ?)',
        session.id,
        city_name,
        latitude,
        longitude
    );

    return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    const db = await getDb();
    await db.run('DELETE FROM favorites WHERE id = ? AND user_id = ?', id, session.id);

    return NextResponse.json({ success: true });
}
