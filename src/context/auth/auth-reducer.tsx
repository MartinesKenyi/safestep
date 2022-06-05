import React from 'react';
import { types } from '../../types/types';
import { User } from '../../interfaces/app-interfacess';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    user: User | null;
}


interface actionType { 
    type:string,
    payload:any
}

export const authReducer = ( state={}, action: actionType ) => {

    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                status: 'authenticated',
                logged: true
            }
    
        case types.logout:
            return {
                logged:false
            }

        case types.notAuthenticated:
            return {
                ...state,
                status: 'notAuthenticated',
                token: null,
                user: null
            }
            // case 'signUp':
            //     return {
            //         ...state,
            //         errorMessage: '',
            //         status: 'authenticated',
            //         token: action.payload.token,
            //         user: action.payload.user
            //     }
    
            // case 'logout':
    
    
        default:
            return state;
    }

} 