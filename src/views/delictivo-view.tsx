import React, { useContext, useState } from 'react'
import { Input } from '../global-components/input/input'

import { useForm } from '../hooks/useForm';
import { DelictivosContext } from '../context/auth/delictivo-context';
import { AuthContext } from '../context/auth/auth-context';
import { useRoles } from '../hooks/usedate';
import { Alert } from '../global-components/alert/alert';
import { SocketContext } from '../context/auth/socket-Context';

const classes = {
    main: 'information',
    container: 'information__container',
    wrap: 'information__wrap',
}

interface alertProps {
    type: 'success' | 'danger' | 'info', 
    message?: string,
    title: string,
    show: boolean
}

export const DelictivoView = () => {

    const { user: userData } = useContext(AuthContext);
    const { registerDelictivo } = useContext(DelictivosContext);
    const { roles } = useRoles();
    const [isEdit, setIsEdit] = useState(false);
    const [tempUri, setTempUri] = useState<string | any>(null);
    const { socket } = useContext(SocketContext);
    const [dataAlert, setDataAlert] = useState<alertProps>({
        type: 'success' ,
        message: '',
        title: '',
        show: false
    });

    const [ values, handleInputChange, reset ] = useForm({
        title: '',
        description: '',
        url: null
    });

    const { title, description, url } = values;

    const handlePictureClick = () => {
        const input = document.querySelector('#fileSelector') as HTMLInputElement | null;
        if (input != null) {
            input.click();
            console.log(input)
        }
    }

    const handleFileChange = (e: any) => {

        const fileName = e.target.files[0];

        if (fileName) {
            setTempUri(fileName)
            const objectURL = URL.createObjectURL(fileName)
            handleInputChange({target:{name:'url',value:objectURL}})
        } else {
            console.log('no se recibe el archivo')
        }
        return fileName;
    }

    const onPublish = async () => {

        if( title.length < 5 ) {
            return alert('danger', 'title', 'El título es obligatorio')
        }

        setIsEdit(true);

        const viewpermise = roles.filter(({name}) => name === "CIUDADANO_ROLE").map(rol => rol.id);

        console.log(viewpermise)

        const resp: any = await registerDelictivo(
            tempUri,
            {
                user: userData?.uid || '',
                latitude: 0,
                longitude: 0,
                viewpermise: JSON.stringify(viewpermise),
                title,
                description
            }
        );

        if (resp.ok) {
            setIsEdit(false);
            // TODO: de evniar un mensaje que se guardó
            alert('success','Guardado', 'Se guardó satisfactoriamente')
            // TODO: limpiar el formulario
            reset();
            socket?.emit('send-new-delictivo-all', {delictivo: resp?.delictivo || {}})
            setTempUri(null)
        } else {
            setIsEdit(true);
            console.log(resp)
            // TODO: enviar el mensaje erroneo
            alert('danger','Formulario','No se guardó')
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
        }, 2500)
    }

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h2> Registro de informacion delictivo </h2>
                <input
                    type="text"
                    name='title'
                    placeholder='Título'
                    value={title}
                    onChange={handleInputChange}
                    disabled={isEdit}
                    required
                />
                <textarea
                    placeholder='Descripción...'
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    disabled={isEdit}
                    required
                >
                </textarea>
                <div className='btn__wrap-notes'>
                    <button
                        disabled={isEdit}
                        className={`btn__notes ${isEdit ? 'disabled' : ''}`}
                        onClick={handlePictureClick}
                    >
                        Picture
                    </button>

                </div>

                <div className='information__control-img'>
                    <img
                        src={url ? url : 'https://www.ceciliagimeno.cl/img/imgs/imagenload.png'}
                        alt="imagen" />
                </div>

                <Input
                    id="fileSelector"
                    type="file"  //nos permite para buscar un archivo 
                    name="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                <div className='information__control-btn'>
                    <button
                         disabled={isEdit}
                        title='Compartir'
                        className={`btn__notes ${isEdit ? 'disabled' : ''}`}
                        onClick={onPublish}
                    >
                        Publicar
                    </button>
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
