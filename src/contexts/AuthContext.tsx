import { createContext, type ReactNode, useContext } from 'react';
import { useAuth, type User } from '../hooks/useAuth';
import { AuthService } from '../services/auth_service';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    login: (username: string, password: string) => Promise<void>;
    error?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authService = new AuthService();

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, loading, handleLogout, handleLogin, error } = useAuth(authService);
    return (
        <AuthContext.Provider value={{ user, loading, logout: handleLogout, login: handleLogin, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext debe usarse dentro de <AuthProvider>');
    return ctx;
}
