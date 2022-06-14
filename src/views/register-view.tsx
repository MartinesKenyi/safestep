import React, { useEffect, useContext, useState } from 'react';
import { Input } from '../global-components/input/input';
import { Button } from '../global-components/button/button';
import { useForm } from '../hooks/useForm';
import { useRoles, useSectors } from '../hooks/usedate';
import { AuthContext } from '../context/auth/auth-context';
import { ComboBox } from '../global-components/select/select';
import { Alert } from '../global-components/alert/alert';
import { createJSDocCallbackTag } from 'typescript';

const classes = {
  main: 'register',
  container: 'register__container',
  title: 'register__title',
  input: 'register__input',
  wrap: 'register_blu',
}

interface alertProps {
  type: 'success' | 'danger' | 'info', 
  message?: string,
  title: string,
  show: boolean
}

export const RegisterView = () => {

  const { signUp, errorMessage, dispatch } = useContext(AuthContext);
  const { roles } = useRoles();
  const { sectors } = useSectors();

  const [dataAlert, setDataAlert] = useState<alertProps>({
    type: 'success',
    message: '',
    title: '',
    show: false
  });

  const [values, handleInputChange, reset] = useForm({
    name: '',
    user: '',
    password: '',
    confirmPassword: '',
    sector: '',
    role: ''
  });

  const { user, role, password, name, confirmPassword, sector } = values;

  useEffect(() => {
    if (errorMessage?.length === 0) return;
  }, [errorMessage, values]);

  const onRegister = async (e: any) => {
    // e.preventDefault();

    if (user.trim().length < 4
      || name.trim().length < 4) {
      return alert('danger','name','Debe contener más de 5 caracteres el usuario ');
    }
    if (password.trim().length < 4) {
      return alert('danger','contraseña','Debe tener más 6 caracteres');
    }
    if (confirmPassword.trim() !== password.trim()) {
      return alert('danger','confirmar contraseña','Deben ser iguales');
    }

    const resp: any = await signUp({
      name: name.toLowerCase(),
      user: user.toLowerCase(),
      password,
      sector,
      role
    });

    if (resp) {
      alert('success','Guardado', 'Se registró el usuario')
      reset()
    } else {
      alert('danger','Usuario','Error al registrar')
    }
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
    }, 3000)
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <h3 className={classes.title}>Registrar Usuario</h3>
        {/* <form 
          onSubmit={onRegister}
          // onSubmit={prueba}
          > */}
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
          <div className='register__wrap-button'>
            <Button
              title='Registrar'
              onClick={onRegister}
              // onClick={prueba}
            />
          </div>
        {/* </form> */}
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
