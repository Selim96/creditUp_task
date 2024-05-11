import React from "react";
import s from './Usermenu.module.scss'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import allSelectors from "../../redux/selectors";
import { logout } from "../../redux/slice";

const Usermenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(allSelectors.getUser);

    const onClickLogout = () => {
        dispatch(logout())
    }
    return (
        <div className={s.menu}>
            <div className={s.user_icon}>{userData.username.toUpperCase()[0]}</div>
            <p className={s.name}>{userData.username}</p>
            <button type="button" className={s.logout} onClick={onClickLogout}>Logout</button>
        </div>
    )
}

export default Usermenu;