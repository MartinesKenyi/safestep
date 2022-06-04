import { useReducer } from 'react';
import { AppRouter } from './routers/app-router';
import { AuthContext } from './components/auth/auth-context';
import { authReducer } from './components/auth/auth-reducer';

const init = () => {
    return {
        logged:true,
        name:'Paty',
        password:1223
    }
    // return JSON.parse(localStorage.getItem('user') || '{ logged: false }')
}

export const Safestep = () => {

  const [usuario, dispatch] = useReducer( authReducer, {}, init);
    
    return (
        <AuthContext.Provider value={{
            usuario,
            dispatch
        }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}