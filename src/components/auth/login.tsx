import React from 'react';

export const LoginScreen = () => {

    return (

        <div className="container login-container">
            <div className="row">

                <div className="">
                    <form>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="usuario"
                                name="lEmail"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                            />
                        </div>
                        <button>
                            INICIAR SESION
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
  
}
