import { useEffect, useState } from "react";

export interface User {
    id?: string;
    username: string;
    email: string;
    fullName?: string;
    token?: string;
    createdAt?: Date;
}

interface UserAuthProps {
    loginFunction?: (username: string, password: string) => Promise<User>;
    logoutFunction?: () => void;
}

export const useAuth = ({ loginFunction: authFunction, logoutFunction }: UserAuthProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('authUser');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('authUser');
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = async (username: string, password: string) => {
        setLoading(true);
        try {
            let userData: User;
            if (authFunction) {
                userData = await authFunction(username, password);
                setUser(userData);
                localStorage.setItem('authUser', JSON.stringify(userData));
                setError(null);
            }
        } catch (error) {
            setError("Error: Credenciales incorrectas.");
            setUser(null);

        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => {
        if (logoutFunction) {
            logoutFunction();
        }
        localStorage.removeItem('authUser');
        setUser(null);
    }

    return { user, loading, handleLogin, handleLogout, error };
};


