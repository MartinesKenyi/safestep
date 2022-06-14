import React, { useState } from 'react'

interface Props {
    type: string, 
    message: string
}

export const useAlert = () => {

    const [viewAlert, setViewAlert] = useState(false);
    const [dataAlert, setDataAlert] = useState<Props>({
        type: '',
        message: ''
    });

    const Alert = (type: string, message: string) => {
        console.log(type, message)
        setDataAlert({type, message});
        setViewAlert(true);
        
        // setTimeout(() => {
        //     setViewAlert(false);
        //     setDataAlert({type: '', message: ''});
        // }, 3000) 
    }

    const AlertHtml = () => {
        return (
            <div className='alerts'>
                <div className='alerts__content'>
                    {/* <i className=" check fa-light fa-check"></i> */}
                    <div className='message'>
                        <span className='text1'>{dataAlert.type}</span>
                        <span className='text2'> {dataAlert.message}</span>
                    </div>
                    <div className='progress'></div>
                </div>

            </div>
        )
    }

    return {
        AlertHtml,
        Alert,
        viewAlert
    }
}
