import React from "react";
import s from './Home.module.scss';
import { useAppSelector } from "../../redux/hooks";
import allSelectors from "../../redux/selectors";
import ListOfEmails from "../../components/ListOfEmails";

const Home: React.FC = ()=> {

    const {id, username, email} = useAppSelector(allSelectors.getUser)
    return (
        <div style={{padding: '80px'}}>
            <div className={s.user_data}>
                <p>User Name: <span>{username}</span></p>
                <p>User Email: <span>{email}</span></p>
            </div>
            <button type="button">Send Email</button>

            <ListOfEmails/>
        </div>
    )
}

export default Home;