// import { createContext } from 'react';

// export const AuthContext = createContext({} as any );


import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { axiosConToken } from '../../helpers/axios';

import { User, LoginData, LoginResponse, RegisterUser } from '../../interfaces/app-interfacess';
import { authReducer, AuthState } from './auth-reducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (RegisterUser: RegisterUser) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    
}



export const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        try {

            const token = await localStorage.getItem('token');
            // No token, no autenticado
            // if (!token) return dispatch({ types:notAuthenticated});

            // Hay token
            const resp = await axiosConToken('/auth/renew');
            if (!resp.ok) {
                // return dispatch({ type: 'notAuthenticated' });
            }

            await localStorage.setItem('token', resp.token );
            
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: resp.token,
                    user: resp.user
                }
            });
        } catch (error) {
            console.log('auth context line 62',error)
        }
    }
    const signIn = async ({ user, password }: LoginData) => {
        try {
            const { data } = await axios.post<LoginResponse>('/auth', { user, password });
            if (data.ok) {
                dispatch({
                    type: 'signUp',
                    payload: {
                        token: data.token,
                        user: data.user
                    }
                });
                await localStorage.setItem('token', data.token);
            }
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };
    const signUp = async ({ role = null, name, user, sector, password }: RegisterUser) => {
        try {
            const { data } = await axios.post<LoginResponse>('/users', { role, name, user, sector, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });
            await localStorage.setItem('token', data.token);
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }
    };
    const logOut = async () => {
        await localStorage.removeItem('token');
        // dispatch({ type: 'logout' });
    };
    
    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}
