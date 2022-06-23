import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/auth/auth-context';
import { DelictivosContext } from '../context/auth/delictivo-context';
import { SocketContext } from '../context/auth/socket-Context';
import { Alert } from '../global-components/alert/alert';
import { Button } from '../global-components/button/button';
import { LoadingSpinnerSmall } from '../global-components/loading/spinner-small';
import { useRoles } from '../hooks/usedate';
import { useForm } from '../hooks/useForm';
import { Delictivo } from '../interfaces/delictivo-interfaces';

const classes = {
    main: 'add-preventive',
    header: 'add-preventive__header',
    title: 'add-preventive__title',
    close: 'add-preventive__close',
    container: 'add-preventive__container',
    containerTitle: 'add-preventive__container__title',
    containerTextarea: 'add-preventive__container__textarea',
    wrapImage: 'add-preventive__container__wrap-image',
    image: 'add-preventive__container__image',
    oparations: 'add-preventive__operations',
}

interface Props {
    setIsAddPreventiveModal: React.Dispatch<boolean>,
    isAddPreventiveModal: boolean,
    delictivo?: Delictivo,
    type: 'preventive' | 'delictivo' | '' | string
}
interface alertProps {
    type: 'success' | 'danger' | 'info',
    message?: string,
    title: string,
    show: boolean
}

export const AddPreventive = ({ setIsAddPreventiveModal, isAddPreventiveModal, delictivo, type }: Props) => {

    const { user: userData } = useContext(AuthContext);
    const { registerDelictivo, editDelictivo } = useContext(DelictivosContext);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUri, setTempUri] = useState<string | any>(null);
    const { roles } = useRoles();
    const { socket } = useContext(SocketContext);
    const [dataAlert, setDataAlert] = useState<alertProps>({
        type: 'success',
        message: '',
        title: '',
        show: false
    });
    const [values, handleInputChange, reset, handleSetValues] = useForm({
        title: '',
        description: '',
        url: null
    });

    const activeId = useRef(delictivo?.id);
    useEffect(() => {
        if (delictivo?.id !== activeId.current) {
            reset();
            activeId.current = delictivo?.id
        }
    }, [delictivo, reset]);

    useEffect(() => {
        if (delictivo && values.title.length === 0) {
            handleSetValues({
                title: delictivo.title,
                description: delictivo.description,
                url: (delictivo.multimedia && delictivo.multimedia?.length > 0) ? delictivo.multimedia[0] : null,
            })
        }

    }, [delictivo, handleSetValues, reset, values])

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
            handleInputChange({ target: { name: 'url', value: objectURL } })
        } else {
            console.log('no se recibe el archivo')
        }
        return fileName;
    }

    const onPublish = async () => {

        if (title.length < 5) {
            return alert('danger', 'title', 'El título es obligatorio')
        }

        setIsEdit(true);

        const viewpermise = roles.filter(({ name }) => name === "CIUDADANO_ROLE").map(rol => rol.id);

        if (type === 'preventive') {
            const resp: any = await editDelictivo(
                tempUri,
                {
                    user: userData?.uid || '',
                    title,
                    viewpermise: JSON.stringify(viewpermise),
                    description,
                },
                delictivo?.id || '',
                type
            );

            if (resp.ok) {
                alert('success', 'Actualizado', 'Se guardó satisfactoriamente')
                reset();
                // socket?.emit('send-new-delictivo-all', { delictivo: resp?.delictivo || {} }) // Emitir actualizacion
                setTempUri(null)
            } else {
                console.log(resp)
                alert('danger', 'Error', 'No se guardó')
            }

            setIsEdit(false);
            setIsAddPreventiveModal(false);
        } else if(type === 'delictivo') {
            const resp: any = await registerDelictivo(
                tempUri,
                {
                    user: userData?.uid || '',
                    title,
                    viewpermise: JSON.stringify(viewpermise),
                    description,
                    state: 'publicado',
                    multimedia: JSON.stringify((!tempUri && (delictivo?.multimedia && delictivo.multimedia?.length > 0)) ? delictivo.multimedia : [])
                },
                type
            );

            if (resp.ok) {
                alert('success', 'Guardado', 'Se guardó satisfactoriamente')
                reset();
                socket?.emit('send-new-delictivo-all', { delictivo: resp?.delictivo || {} })
                setTempUri(null)

                // TODO ACTUALIZA EL ESTADO DEL DELICTIVO 
                if (type === 'delictivo') {
                    editDelictivo(
                        undefined,
                        {
                            user: userData?.uid || '',
                            title,
                            state: 'preventiva'
                        },
                        delictivo?.id || '',
                        type
                    );
                }

            } else {
                console.log(resp)
                alert('danger', 'Formulario', 'No se guardó')
            }
            setIsEdit(false);
            setIsAddPreventiveModal(false);
        } else {
            const resp: any = await registerDelictivo(
                tempUri,
                {
                    user: userData?.uid || '',
                    title,
                    viewpermise: JSON.stringify(viewpermise),
                    description,
                    state: 'publicado',
                    multimedia: JSON.stringify((!tempUri && (delictivo?.multimedia && delictivo.multimedia?.length > 0)) ? delictivo.multimedia : [])
                },
                'preventive'
            );
            
            if (resp.ok) {
                alert('success', 'Guardado', 'Se guardó satisfactoriamente')
                reset();
                socket?.emit('send-new-delictivo-all', { delictivo: resp?.delictivo || {} })
                setTempUri(null)

            } else {
                console.log(resp)
                alert('danger', 'Formulario', 'No se guardó')
            }
            setIsEdit(false);
            setIsAddPreventiveModal(false);
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
        <div className={`${classes.main} ${!isAddPreventiveModal ? 'close' : ''}`}>
            <section className={classes.header}>
                <div />
                <h2 className={classes.title}>{`
                    ${type === 'delictivo' ? 'Editar y publicar de un hecho delictivo a información preventiva' : ''}
                    ${type === 'preventive' ? 'Editar información preventiva' : ''}
                    ${type === '' ? 'Crear información preventiva' : ''}
                `}</h2 >
                <div
                    className={classes.close}
                    onClick={() => setIsAddPreventiveModal(false)}
                />
            </section>
            <section className={classes.container}>
                <input
                    className={classes.containerTitle}
                    type="text"
                    name='title'
                    placeholder='Título'
                    value={title}
                    onChange={handleInputChange}
                    disabled={isEdit}
                    required
                />
                <textarea
                    className={classes.containerTextarea}
                    placeholder='Descripción...'
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    disabled={isEdit}
                    required
                />
                <article className={classes.wrapImage}>
                    <Button
                        title='Seleccionar imagen'
                        disabled={isEdit}
                        className={`btn__notes ${isEdit ? 'disabled' : ''}`}
                        onClick={handlePictureClick}
                    />
                    <img
                        className={classes.image}
                        src={url ? url : 'https://www.ceciliagimeno.cl/img/imgs/imagenload.png'}
                        alt="imagen" />

                    <input
                        id="fileSelector"
                        type="file"
                        name="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </article>
            </section>
            <section className={classes.oparations}>
                <div />
                <div />
                <Button
                    disabled={isEdit}
                    title={`${type === 'preventive' ? 'Actualizar' : 'Publicar'}`}
                    className={`btn__notes ${isEdit ? 'disabled' : ''}`}
                    onClick={onPublish}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {
                        isEdit &&
                        <LoadingSpinnerSmall />
                    }
                </Button>

            </section>
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