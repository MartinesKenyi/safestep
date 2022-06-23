import React from 'react'

const classes = {
    main: 'lds-spinner'
}

export const LoadingSpinnerSmall = () => {
    return (
        <div className={classes.main} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}
