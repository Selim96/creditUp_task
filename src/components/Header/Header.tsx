import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Header.module.scss'
import Usermenu from '../Usermenu/Usermenu';
import { useAppSelector } from '../../redux/hooks';
import allSelectors from '../../redux/selectors';

const setActiveLink = ({isActive}: any)=> isActive ? `${s.navigation_link} ${s.active}` : s.navigation_link;

const Header: React.FC = () => {
    const isLogedIn = useAppSelector(allSelectors.getLogged);

    return <header className={s.header}>
        {/* <Link to={'/'}><Logo/></Link> */}
        <p className={s.title}>Email Sender</p>
        {/* <nav className={s.navigation}>
            <NavLink to='/' className={setActiveLink} >Home</NavLink>
        </nav> */}

        {isLogedIn && <Usermenu/>}
    </header>
};

export default Header;