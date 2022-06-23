import React, { useContext, useEffect, useState } from 'react'
import { ListDelictivoFactView } from './list-delictivo-fact-view';
import { ListPreventiveFactView } from './list-preventive-fact-view';
import { Button } from '../global-components/button/button';
import { AddPreventive } from '../components/add-preventive';
import { Delictivo } from '../interfaces/delictivo-interfaces';
import { Modal } from '../global-components/modal/modal';
import { DelictivosContext } from '../context/auth/delictivo-context';
import { Alert } from '../global-components/alert/alert';
import { useRoles } from '../hooks/usedate';
import { SocketContext } from '../context/auth/socket-Context';

// import { Alert } from '../global-components/alert/alert';

const classes = {
    main: 'preventive',
    data: 'preventive__data',
    sectionButton: 'preventive__section-button',
    sectionData: 'preventive__section-data',
    articleData: 'preventive__article-data',
    articleTitle: 'preventive__article-title',

    delictivoModal: 'preventive__delictivo-modal',
}

interface alertProps {
    type: 'success' | 'danger' | 'info',
    message?: string,
    title: string,
    show: boolean
}

export const PreventiveView = () => {


    const [isAddPreventiveModal, setIsAddPreventiveModal] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const { registerDelictivo, editDelictivo } = useContext(DelictivosContext);
    const { socket } = useContext(SocketContext);
    const [delictivoSelect, setDelictivoSelect] = useState<Delictivo | undefined | any>();
    const [type, setType] = useState<string>('');
    const { roles } = useRoles();
    const [dataAlert, setDataAlert] = useState<alertProps>({
        type: 'success',
        message: '',
        title: '',
        show: false
    });

    const modalDelictivo = () => {
        setIsAddPreventiveModal(true);
        setDelictivoSelect(undefined)
    }

    useEffect(() => {
        if (!isAddPreventiveModal) {
            setDelictivoSelect(undefined)
        }
    }, [isAddPreventiveModal])
    

    const modalDelictivoEdit = (delictivo: Delictivo, type: string) => {
        setIsAddPreventiveModal(true);
        setType(type);
        setDelictivoSelect(delictivo)
    }
    const delictivoPublish = (delictivo: Delictivo, type: string) => {
        setIsModal(true);
        setType(type);
        setDelictivoSelect(delictivo)
    }
    const okButtonModal = async () => {
        if (type === 'delictivo') {
            // TODO: crear nuevo y modificar estado "preventiva" del anterior
            const viewpermise = roles.filter(({ name }) => name === "CIUDADANO_ROLE").map(rol => rol.id);
            const resp: any = await registerDelictivo(
                undefined,
                {
                    user: delictivoSelect?.user?._id || '',
                    title: delictivoSelect?.title || '',
                    viewpermise: JSON.stringify(viewpermise),
                    description: delictivoSelect?.description || '',
                    state: 'publicado',
                    multimedia: JSON.stringify((delictivoSelect?.multimedia && delictivoSelect.multimedia?.length > 0) ? delictivoSelect.multimedia : [])
                }, 'preventive'
            );

            if (resp.ok) {
                alert('success', 'Publicado', 'Se publicó satisfactoriamente')
                socket?.emit('send-new-delictivo-all', { delictivo: resp?.delictivo || {} })

                editDelictivo(
                    undefined,
                    {
                        user: delictivoSelect?.user?._id || '',
                        title: delictivoSelect?.title || '',
                        state: "preventiva"
                    },
                    delictivoSelect?.id || '',
                    type
                );
            } else {
                console.log(resp)
                alert('danger', 'Error', 'No se publicó')
            }
            setIsModal(false);

        } else if (type === 'preventive') {
            // TODO: modificar temporary a false, stado: 'publicado'

            const resp: any = await editDelictivo(
                undefined,
                {
                    user: delictivoSelect?.user?._id || '',
                    title: delictivoSelect?.title || '',
                    temporary: false,
                    state: "publicado"
                },
                delictivoSelect?.id || '',
                type
            );

            if (resp.ok) {
                alert('success', 'Publicado', 'Se publicó satisfactoriamente')
                // socket?.emit('send-new-delictivo-all', { delictivo: resp?.delictivo || {} }) // Emitir actualizacion
            } else {
                console.log(resp)
                alert('danger', 'Error', 'No se publicó')
            }
            setIsModal(false);
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
            <section className={classes.sectionButton}>
                <Button
                    title='Crear nuevo registro preventivo'
                    onClick={modalDelictivo}
                />
            </section>
            <div className={classes.data}>
                <section className={classes.sectionData}>
                    <article className={classes.articleData}>
                        <h4 className={classes.articleTitle}>Registro de hechos delictivos</h4>
                        <ListDelictivoFactView
                            modalDelictivoEdit={modalDelictivoEdit}
                            delictivoPublish={delictivoPublish}
                        />
                    </article>
                    <article className={classes.articleData}>
                        <h4 className={classes.articleTitle}>Registro de información preventiva</h4>
                        <ListPreventiveFactView
                            modalDelictivoEdit={modalDelictivoEdit}
                            delictivoPublish={delictivoPublish}
                        />
                    </article>
                </section>
            </div>

            <section className={`${classes.delictivoModal} ${(isAddPreventiveModal) ? 'active' : ''}`}>
                <AddPreventive
                    setIsAddPreventiveModal={setIsAddPreventiveModal}
                    isAddPreventiveModal={isAddPreventiveModal}
                    delictivo={delictivoSelect}
                    type={type}
                />
            </section>
            <Modal
                title='¿Estas seguro de publicar?'
                isModal={isModal}
                setIsModal={setIsModal}
                okButtonModal={okButtonModal}
                message={delictivoSelect?.title}
            />
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
