export async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
    }

    return response.json();
}

export async function signup(email: string, password: string) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Signup failed');
    }

    return response.json();
}

export async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
}

export async function getCurrentUser() {
    try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        return null;
    }
}
