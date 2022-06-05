import React, { useContext } from 'react';
import { AuthContext } from '../context/auth/auth-context';
import { LoginView } from '../views/login-view';

interface Props {
    children?: JSX.Element | JSX.Element[] | null | any ;
}

export const ValidateAccount = ({ children }: Props) => {

    const { user } = useContext(AuthContext);

    // console.log(user)
    // const uid = false

    // if ( false ) {
    //     return (<div><h1>Espere....</h1></div>)
    // }

    return user ? children : <LoginView />;
}