import type { User } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL + '/auth';

console.log("API_URL:", API_URL);

interface AuthServiceInterface {
    loginFunction(email: string, password: string): Promise<User>;
    logoutFunction(): Promise<void>;
}

export class AuthService implements AuthServiceInterface {
    async loginFunction(email: string, password: string): Promise<User> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });

        const user = await response.json();

        if (!response.ok) {
            throw new Error('Error: ' + (user.message || 'Error desconocido'));
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.full_name,
            token: user.token,
            createdAt: new Date(user.createdAt),
        };
    }

    async logoutFunction(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}