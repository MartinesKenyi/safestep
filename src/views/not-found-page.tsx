import React from 'react'
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
       <h2>No se encontró esta página</h2>
       <hr />
       <Link to='/'>
           <p>Regrese</p>
       </Link>
    </div>
  )
}
