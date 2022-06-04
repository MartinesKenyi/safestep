import React, { useContext } from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { types } from '../../types/types'

import { AuthContext } from '../auth/auth-context';

export const NavBar = () => {
    
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(context);
    const handleLogout = () => {

        // dispatch({type: types.logout})

        navigate('/login',{
            replace:true
        });
    }


  return (
    <div>
        <nav className="">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="">
                <div className="">

                    <NavLink 
                        // {...(navData) => navData.isActive && "active"}
                        className="nav-item nav-link"
                        to="/reports"
                    >
                        Reports
                    </NavLink>

                    <NavLink 
                        // {...(navData) => navData.isActive && "active"}
                        className="nav-item nav-link"
                        to="/register-delictivo"
                    >
                        Register Delictivo
                    </NavLink>

                    <NavLink 
                        // {...(navData) => navData.isActive && "active"}
                        className="nav-item nav-link"
                        to="/craete-user"
                    >
                        CreateUser
                    </NavLink>
                </div>
            </div>

            <div className="">
                <ul className="">

                    <span className="nav-item nav-link text-info">
                        {/* {user.name} */}
                    </span>

                    <button
                        className="nav-item nav-link btn" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    </div>

  );
};


