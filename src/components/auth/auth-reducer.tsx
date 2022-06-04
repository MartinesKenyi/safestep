import React from 'react';
import { types } from '../../types/types';

interface actionType { 
    type:string,
    payload:any
}

export const authReducer = ( state={}, action: actionType ) => {

    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }
    
        case types.logout:
            return {
                logged:false
            }
    
        default:
            return state;
    }

} 