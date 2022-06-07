import React, { InputHTMLAttributes } from 'react'

const classes = {
    main: 'input',
    title: 'input__title',
    box: 'input__box'
}

interface Props extends InputHTMLAttributes<HTMLInputElement > {
    className?: string;
    title?: string;
    type?: string;
    msgError?: string
}

export const Input = ({
    className,
    title,
    type = 'text',
    msgError,
    ...rest
}: Props) => {
    return (
        <div className={`${classes.main} ${className ? className : ''}`}>
            {title && <p className={classes.title}> {title} </p>}
            <input 
                className={classes.box}
                type={type}
                {...rest}
            />
        </div>
    )
}   
