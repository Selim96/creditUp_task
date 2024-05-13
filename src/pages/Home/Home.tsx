import React from "react";
import s from './Home.module.scss';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import allSelectors from "../../redux/selectors";
import ListOfEmails from "../../components/ListOfEmails";
import { toggleModal } from "../../redux/slice";
import Modal from "../../components/Modal";

const Home: React.FC = ()=> {

    const {id, username, email} = useAppSelector(allSelectors.getUser);
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(allSelectors.getIsModalOpen)
    const openModal = () => {
        dispatch(toggleModal(true))
    }
    return (
        <div style={{padding: '80px'}}>
            <div className={s.user_data}>
                <p>User Name: <span>{username}</span></p>
                <p>User Email: <span>{email}</span></p>
            </div>
            <button type="button" onClick={openModal}>Send Email</button>

            <ListOfEmails/>
            {isModalOpen && <Modal/>}
        </div>
    )
}

export default Home;