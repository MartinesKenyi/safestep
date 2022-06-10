import { AppRouter } from './routers/app-router';
import { AuthProvider } from './context/auth/auth-context';
import { DelictivosProvider } from './context/auth/delictivo-context';


export const Safestep = () => {

    const DelictivoState = ({ children }: any) => {
        return (
            <DelictivosProvider>
                {children}
            </DelictivosProvider>)
    }

    return (
        <AuthProvider>
            <DelictivoState>
                <AppRouter />
            </DelictivoState>
        </AuthProvider>
    )
}

