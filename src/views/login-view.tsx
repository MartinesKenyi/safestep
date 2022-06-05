import axios from 'axios';
import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/auth-context';

import { Button } from '../global-components/button/button';
import { Input } from '../global-components/input/input';
import { axiosSinToken } from '../helpers/axios';
import { useForm } from '../hooks/useForm';
import { types } from '../types/types';

const classes = {
    main: 'login',
    iconLogo: 'login__icon-logo',
    container: 'login__container',
    wrap: 'login__wrap',
    info: 'login__info',
}

export const LoginView = () => {

    // const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const [login, setLogin] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = login;

    useEffect(() => {
    }, [login])
    
    const handleLogin = (e: any) => {
        e.preventDefault();

        const action = {
            type: types.login,
            payload: {email,password}
        }
        dispatch(action)

        const res = axios.get('/auth')
        // navigate('/reports',{
        //     replace: true
        // })
    
    }

    return (
        <div className={classes.main}>
            <h4 className={classes.iconLogo}>Cube</h4>

            <div className={classes.container}>
                <div className={classes.wrap}>
                    <h3>Inicia sesión</h3>
                    <form onSubmit={handleLogin}>
                        <Input
                            type='text'
                            name='email'
                            placeholder='Ingrese su cuenta corporativa'
                            // autoComplete='off'
                            value={email}
                            onChange={setLogin}
                            required
                        />
                        <Input
                            name="password"
                            onChange={setLogin} 
                            type="password"
                            value={ password }
                            placeholder='Ingrese su contraseña'
                            required
                        />
                        {/* {
                            msgError && (
                                <p className="msg__error"> {msgError} </p>
                            )
                        } */}
                        <Button
                            title='Iniciar sesión'
                            type='submit'
                        />
                    </form>
                </div>
                <div className={classes.info}>
                    {/* logo de la empresa de quien va a ser el dashboard */}
                    <p>...</p>
                    <h4>Bienvenido de nuevo! </h4>
                    <p>hoy tenemos nuevos retos que lograr.</p>
                </div>
            </div>
        </div>
    )
}

