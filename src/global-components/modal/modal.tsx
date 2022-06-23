import React, { useEffect, useState } from 'react'
import { Button } from '../button/button'
import { LoadingSpinnerSmall } from '../loading/spinner-small';

const classes = {
    main: 'modal',
    content: 'modal__content',
    header: 'modal__header',
    title: 'modal__title',
    body: 'modal__body',
    message: 'modal__message',
    footer: 'modal__footer',
}

interface Props {
    title: string,
    isModal: boolean
    setIsModal: React.Dispatch<boolean>
    okButtonModal?: any,
    message?: string
}

export const Modal = ({ title, message, okButtonModal, isModal, setIsModal }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!isModal) {
            setIsLoading(false)
        }
      
    }, [isModal])
    

    return (
        <div className={`${classes.main} ${isModal ? 'active' : ''}`}>
            <div className={classes.content}>
                <section className={classes.header}>
                    <h3 className={classes.title}>{title}</h3>
                </section>

                <section className={classes.body}>
                    <p className={classes.message}>{message}</p>
                </section>

                <section className={classes.footer}>
                    <Button
                        title='cancelar'
                        onClick={() => setIsModal(false)}
                        inverted
                    />
                    <Button
                        title='Ok'
                        onClick={() => { setIsLoading(true); okButtonModal()}}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {
                            isLoading &&
                            <LoadingSpinnerSmall />
                        }
                    </Button>
                </section>
            </div>
        </div>
    )
}
