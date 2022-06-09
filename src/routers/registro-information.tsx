import React from 'react'

const classes = {
  main: 'information',
  container: 'information__container',
  wrap:'information__wrap',
  textarea:'information__textarea',
  div: 'information__imagen',
}

export const RegistroDeInformacion = () => {
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.wrap}>
          <form>
            <h3>Nuevo registro de información para prevención del delito</h3>
            <input type="text" name="" placeholder='titulo' />
            <textarea name=""
            placeholder='Descripción...'
            >
            </textarea>
            <div className={classes.div}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Odebrecht_Lima.png" 
              alt="business"
              className='imagen' />
            </div>
            <button>
              compartir
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
