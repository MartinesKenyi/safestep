import React, { SelectHTMLAttributes } from 'react'

const classes =  {
    main: 'combo',
    container:'combo_container',
    title: 'combo__title',
    select: 'combo__select'
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement > {
    data: {
        name: string,
        id: string
    }[],
    title?: string,
    className?: string,
    // props?: any
}

export const ComboBox = ({data = [], title, required = false, className, ...props}: Props) => {
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        {title && <p className={`${className} ${classes.title}`}> {title} </p>}
         <select  required={required} {...props} className={classes.select}>
            <option> seleccione una opcion</option>
            {
              data.map( (sector) => 
                  <option key={sector.id} value={sector.id}>
                    { sector.name }
                  </option>
              )
            }
          </select>
      </div>
    </div>
  )
}
