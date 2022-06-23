import React, { ButtonHTMLAttributes } from 'react'

const classes = {
    main: 'button',
    box: 'button__box',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    inverted?: boolean,
    children?: any
}

export const Button = ({
    title,
    className,
    inverted= false,
    children,
    ...rest
}: Props) => {
  return (
    <div className={classes.main}>
        <button 
            className={` ${classes.box} ${className} ${inverted ? 'inverted': ''}`}
            {...rest}
        >
            {title}
        {children}
        </button>
    </div>
  )
}
