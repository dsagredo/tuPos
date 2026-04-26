export type LoginPayload = {
    username: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    user: {
        role: string;
        [key: string]: unknown;
    };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login({
    username,
    password,
}: LoginPayload): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error('Credenciales inválidas');
    }

    return res.json();
}
