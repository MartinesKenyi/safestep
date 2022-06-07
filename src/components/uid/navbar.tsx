import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { types } from '../../types/types'

import { AuthContext } from '../../context/auth/auth-context';

export const NavBar = () => {
    
    const {user, dispatch} = useContext(AuthContext);
    // const navigate = useNavigate();
    console.log(user);
    // const handleLogout = () => {

    //     // dispatch({type: types.logout})

    //     navigate('/login',{
    //         replace:true
    //     });
    // }


  return (
    <nav className="">
        <input type="checkbox" id="check"/>
        <label form="check" className="checkbtn">
            hello
        </label>
        <div className="">
            <ul>
                <li>
                    <NavLink to="/"> <h1>REPORTES</h1></NavLink>
                    
                    <NavLink to="/delictivo"> <h1>registro de informacion</h1></NavLink>
                    <NavLink to="/register"> <h1>registro de usuario</h1></NavLink>
                </li>
            </ul>

        </div>

        {/* <div className="">
            <ul className="">

                <span className="nav-item nav-link text-info">
                    {/* {user.name} */}
                {/* </span>

                <button
                    className="nav-item nav-link btn" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </ul>
        </div> */} 

    </nav>

  );
};


