import React, { ButtonHTMLAttributes } from 'react'

const classes = {
    main: 'button',
    box: 'button__box'
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
}

export const Button = ({
    title,
    ...rest
}: Props) => {
  return (
    <div className={classes.main}>
        <button className={classes.box} {...rest}>
            {title}
        </button>
    </div>
  )
}
