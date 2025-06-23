import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import App from './App';
import AuthPage from './AuthPage';
import { useAuthContext } from '../contexts/AuthContext';

function RequireAuth() {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    return <Outlet />;
}

function PublicRoute() {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

const router = createBrowserRouter([
    {
        element: <RequireAuth />,
        children: [
            {
                path: '/',
                element: <App />,
            },
        ],
    },
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/auth',
                element: <AuthPage />
            }],
    },
]);

export default router;
