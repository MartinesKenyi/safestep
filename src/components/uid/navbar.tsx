import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth-context';

const classes = {
    main: 'nav',
    iconLogo: 'nav__icon-logo',
    container: 'nav__container',
    wrapLinks: 'nav__wrap-links',
    links: 'nav__links',
    btnClose: 'nav__btn-close',
    user: 'nav__user'
}
export const NavBar = () => {

    const { logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
    }


    return (
        <nav className={classes.main}>
            <label form="check" className={classes.user}>
                Welcome back!!
            </label>

            <div className={classes.container}>
                <div className={classes.wrapLinks}>
                    <ul className={classes.links}>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? 'active' : ''}>
                                <h4>Reporte general</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/preventivo"
                                className={({isActive}) => isActive ? 'active' : ''}>
                                <h4>Preventivo</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/risk-map"
                                className={({isActive}) => isActive ? 'active' : ''}>
                                <h4>Mapa de riesgo</h4>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/registro"
                                className={({isActive}) => isActive ? 'active' : ''}>
                                <h4>Registro de usuarios</h4>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <button
                    className={classes.btnClose}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

        </nav>

    );
};


