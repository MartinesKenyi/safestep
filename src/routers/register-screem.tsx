import React from 'react';
import {Input} from '../global-components/input/input';
import { Button } from '../global-components/button/button';

const classes = {
  main: 'register',
  title: 'register__title',
  iconLogo: 'register-logo',
  input: 'register__input',
  container: 'register__bla',
  wrap: 'register_blu',
}

export const RegisterScreem = () => {

  const handleLogin = () => {
    console.log('hiciste click')
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <h3 className={classes.title}>Registrar Usuario</h3>
        <form onSubmit={handleLogin}>
          <Input
            type='text'
            name='user'
            placeholder='Nombre'
            className='register__input'
            autoComplete='off'
            title='Nombre de usuario'
            // value={user}
            // onChange={setLogin}
            required
          />

          <Input
            type="email"
            name="email"
            // onChange={setLogin} 
            className='register__input'
            placeholder='@usuario'
            title='Cuenta de usuario'
            // value={ password }
            required
          />
{/* va ser combobox */}
          <Input
            name="role"
            // onChange={setLogin} 
            placeholder='Role de usuario'
            className='register__input'
            title="Rol de usuario"
            type="text"
            // value={ password }
            required
          />

{/* va ser combobox */}
          <Input
            name="sector"
            // onChange={setLogin} 
            className='register__input'
            placeholder='Sector'
            title="Rol del usuario"
            type="sector"
            // value={ password }
            required
          />

          <Input
            name="password"
            // onChange={setLogin} 
            placeholder='Ingrese su contraseña'
            className='register__input'
            title="Contraseña"
            type="password"
            // value={ password }
            required
          />

          <Input
            name="password"
            placeholder='Ingrese su contraseña'
            className='register__input'
            type="password"
            title="Confirmar contraseña"
            // value={ password }
            // onChange={setLogin} 
            required
          />
          {/* {
              msgError && (
                  <p className="msg__error"> {msgError} </p>
              )
          } */}
          <Button
              title='Enviar'
              type='submit'
            
          />
        </form>
      </div>
    </div>
)
}
