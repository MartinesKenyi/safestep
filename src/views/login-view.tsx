import React, { useContext,useEffect,useState } from 'react';
import { AuthContext } from '../context/auth/auth-context';

import { Button } from '../global-components/button/button';
import { Input } from '../global-components/input/input';
import { useForm } from '../hooks/useForm';
import { Alert } from '../global-components/alert/alert';

const classes = {
    main: 'login',
    iconLogo: 'login__icon-logo',
    container: 'login__container',
    wrap: 'login__wrap',
    info: 'login__info',
    business: 'login__business'
}

interface alertProps {
    type: 'success' | 'danger' | 'info', 
    message?: string,
    title: string,
    show: boolean
  }

export const LoginView = () => {

    const { signIn, errorMessage, dispatch } = useContext(AuthContext);
    const [dataAlert, setDataAlert] = useState<alertProps>({
        type: 'success',
        message: '',
        title: '',
        show: false
      });
      

    const [login, setLogin] = useForm({
        user: '',
        password: ''
    });

    const { user, password } = login;

    useEffect(() => {
      if (errorMessage && errorMessage?.length > 0) {
        alert('danger','Contraseña',errorMessage);

        dispatch({
            type: 'removeError'
        })
      }
    }, [errorMessage,dispatch])
    
    
    const handleLogin = async(e: any) => {
        e.preventDefault();
        
        if (password.trim().length < 4) {
            return alert('danger','Contraseña','Contraseña incorrecto');
        }
        signIn( {user,password}); 
    }

    const alert = (type: 'success' | 'danger' | 'info', title: string, message: string) => {
        setDataAlert({
            type,
            title,
            message,
            show: true
        })
    
        setTimeout(() => {
            setDataAlert({
                type: 'success',
                title: '',
                message: '',
                show: false
            })
        }, 2500)
      }

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.wrap}>
                    <h3>Inicia sesión</h3>
                    <form onSubmit={handleLogin}>
                        <Input
                            type='text'
                            name='user'
                            placeholder='Ingrese su cuenta corporativa'
                            value={user}
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
                        
                        <Button
                            title='Iniciar sesión'
                            type='submit'
                        />

                    </form>
                </div>
                <div className={classes.info}>
                    <p className={classes.business}>CARMEN DE LA LEGUA REYNOSO</p>
                    <h4>Bienvenido de nuevo! </h4>
                    <p>hoy tenemos nuevos retos que lograr.</p>
                </div>
            </div>
            {dataAlert.show &&
                <Alert
                    type={dataAlert.type}
                    title={dataAlert.title}
                    message={dataAlert.message}
                />
            } 
        </div>
    )
}

 