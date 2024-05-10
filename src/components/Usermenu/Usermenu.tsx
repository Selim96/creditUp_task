import React from "react";
import s from './Usermenu.module.scss'
import { useAppSelector } from "../../redux/hooks";
import allSelectors from "../../redux/selectors";

const Usermenu: React.FC = () => {
    const userData = useAppSelector(allSelectors.getUser)
    return (
        <div className={s.menu}>
            <div className={s.user_icon}>{userData.username.toUpperCase()[0]}</div>
            <p className={s.name}>{userData.username}</p>
            <button type="button" className={s.logout}>Logout</button>
        </div>
    )
}

export default Usermenu;