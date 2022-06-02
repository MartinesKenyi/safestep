import React from 'react';
import { Button } from '../global-components/button/button';
import { Input } from '../global-components/input/input';
import { useForm } from '../hooks/useForm';

const classes = {
    main: 'login',
    iconLogo: 'login__icon-logo',
    container: 'login__container',
    wrap: 'login__wrap',
    info: 'login__info',
}

export const LoginView = () => {

    const [login, setLogin] = useForm({
        email: '',
        password: ''
      });
    
      const handleLogin = (e: any) => {
        e.preventDefault();
        const { email, password } = login;
        console.log(email, password)
      }

    return (
        <div className={classes.main}>
            <h4 className={classes.iconLogo}>Cube</h4>

            <div className={classes.container}>
                <div className={classes.wrap}>
                    <h3>Inicia sesión</h3>
                    <form onSubmit={handleLogin}>
                        <Input
                            name='email'
                            placeholder='Ingrese su cuenta corporativa'
                            // onChange={(e) => { setLogin(e); dispatch(removeError()) }}
                            required
                        />
                        <Input
                            name="password"
                            // onChange={(e) => { setLogin(e); dispatch(removeError()) }}
                            type="password"
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