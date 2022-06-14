import React from 'react'

interface Props {
    type: 'success' | 'danger' | 'info', 
    message?: string,
    title: string 
}

export const Alert = ({type, message, title}: Props) => {

    return (
        <div className={`alerts alerts--${type}`}>
            <div className='alerts__content'>
                {/* <i className=" check fa-light fa-check"></i> */}
                <div className='message'>
                    <span className='text1'>{title}</span>
                    <span className='text2'> {message}</span>
                </div>
                {/* <i className=" close fa-light fa-x"></i> */}
                <div className={`alerts__progress--${type}`}></div>
            </div>

        </div>
    )
}
