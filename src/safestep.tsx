import { AppRouter } from './routers/app-router';
import { AuthProvider } from './context/auth/auth-context';
import { DelictivosProvider } from './context/auth/delictivo-context';
// import { SocketProvider } from './context/auth/socket-Context';


export const Safestep = () => {

    const DelictivoState = ({ children }: any) => {
        return (
            <DelictivosProvider>
                {children}
            </DelictivosProvider>)
    }

    return (
        <AuthProvider>
            {/* <SocketProvider> */}
                <DelictivoState>
                    <AppRouter />
                </DelictivoState>
            {/* </SocketProvider> */}
        </AuthProvider>
    )
}

