import { useEffect, useReducer } from 'react';
import { AppRouter } from './routers/app-router';
import { AuthContext } from './context/auth/auth-context';
import { authReducer } from './context/auth/auth-reducer';

const init = () => {
    // return {}
    return JSON.parse(localStorage.getItem('usuario') || '{ logged: false }')
}

export const Safestep = () => {

    const [usuario, dispatch] = useReducer( authReducer, {}, init);
        
    useEffect(() => {
        if(!usuario) return ;
        
        localStorage.setItem('user',JSON.stringify(usuario));
    }, [usuario]);
    
    return (
        <AuthContext.Provider value={{
            usuario,
            dispatch
        }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}