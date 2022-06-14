import React, { useContext } from 'react';
import { AuthContext } from '../context/auth/auth-context';
import { LoginView } from '../views/login-view';

interface Props {
    children?: JSX.Element | JSX.Element[] | null | any ;
}

export const ValidateAccount = ({ children }: Props) => {

    const { status } = useContext(AuthContext);
    console.log(status)
    if (status === 'checking') {
        return <>Validando....</>
    }

    return status === "authenticated" ? children : <LoginView />
}