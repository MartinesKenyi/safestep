import React, { useEffect, useContext } from 'react';
import { Input } from '../global-components/input/input';
import { Button } from '../global-components/button/button';
import { useForm } from '../hooks/useForm';
import { useRoles, useSectors } from '../hooks/usedate';
import { AuthContext } from '../context/auth/auth-context';
import { ComboBox } from '../global-components/select/select';

const classes = {
  main: 'register',
  container: 'register__container',
  title: 'register__title',
  // iconLogo: 'register-logo',
  input: 'register__input',
  wrap: 'register_blu',
}

export const RegisterView = () => {

  const { signUp, errorMessage, removeError, dispatch } = useContext(AuthContext);
  const { roles } = useRoles();
  const { sectors } = useSectors();

  const [values, handleInputChange,reset] = useForm({
    name: '',
    user: '',
    password: '',
    confirmPassword: '',
    sector: '',
    role: ''
  });

  const { user, role, password, name, confirmPassword, sector } = values;

  useEffect(() => {
    if (errorMessage.length === 0) return;

    alert(errorMessage);

  }, [errorMessage,values]);

  const onRegister = async (e: any) => {
    e.preventDefault();
    
    if (user.trim().length < 4
      || name.trim().length < 4) {
      return dispatch({
        type: 'addError',
        payload: 'Todos los datos son importantes!'
      });
    }
    if (password.trim().length < 4) {
      return dispatch({
        type: 'addError',
        payload: 'La contraseña debe de ser mayor a 6 dígitos'
      });
    }
    if (confirmPassword.trim() !== password.trim()) {
      return dispatch({
        type: 'addError',
        payload: 'Las contraseñas no coinciden'
      });
    }
    
    const resp = await signUp({
      name: name.toLowerCase(),
      user: user.toLowerCase(),
      password,
      sector,
      role
    });
    console.log(resp)
    
    if (resp) {
      reset() 
      console.log('registrado')
    } else {
      console.log('error al registrar')
    }
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <h3 className={classes.title}>Registrar Usuario</h3>
        <form onSubmit={onRegister}>
          <Input
            type='text'
            name='name'
            placeholder='Nombre'
            className='register__input'
            autoComplete='off'
            title='Nombre de usuario'
            value={name}
            onChange={handleInputChange}
            required
          />

          <Input
            type='text'
            name='user'
            className='register__input'
            placeholder='usuario'
            title='Cuenta de usuario'
            value={user}
            onChange={handleInputChange}
            required
          />

          <ComboBox
            title='Rol de usuario'
            className='combobox'
            name='role'
            data={roles}
            value={role}
            onChange={handleInputChange}
          />

          <ComboBox
            title='Sector de usuario'
            name='sector'
            className='combobox'
            data={sectors}
            required={true}
            value={sector}
            onChange={handleInputChange}
          />

          <Input
            name='password'
            placeholder='Ingrese su contraseña'
            className='register__input'
            title='Contraseña'
            type='password'
            value={password}
            onChange={handleInputChange}
            required
          />

          <Input
            name='confirmPassword'
            placeholder='Ingrese su contraseña'
            className='register__input'
            type='password'
            title='Confirmar contraseña'
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
          {/* {
              msgError && (
                  <p className="msg__error"> {msgError} </p>
              )
          } */}
          <Button
            title='Registrarse'
            type='submit'

          />
        </form>
      </div>
    </div>
  )
}
