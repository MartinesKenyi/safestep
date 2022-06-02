import React, { InputHTMLAttributes } from 'react'

const classes = {
    main: 'input',
    title: 'input__title',
    box: 'input__box'
}

interface Props extends InputHTMLAttributes<HTMLInputElement > {
    title?: string;
    type?: string;
    msgError?: string
}

export const Input = ({
    title,
    type = 'text',
    msgError,
    ...rest
}: Props) => {
    return (
        <div className={classes.main}>
            {title && <p className={classes.title}> {title} </p>}
            <input 
                className={classes.box}
                type={type}
                {...rest}
            />
        </div>
    )
}   
