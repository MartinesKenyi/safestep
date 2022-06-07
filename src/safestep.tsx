import { AppRouter } from './routers/app-router';
import { AuthProvider } from './context/auth/auth-context';

export const Safestep = () => {    
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}