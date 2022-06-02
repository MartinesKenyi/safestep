import React from 'react';
import { LoginView } from '../views/login-view';

interface Props {
    children?: JSX.Element | JSX.Element[] | null | any ;
}

export const ValidateAccount = ({ children }: Props) => {

    const uid = false

    if ( false ) {
        return (<div><h1>Espere....</h1></div>)
    }

    return uid ? children : <LoginView />;
}