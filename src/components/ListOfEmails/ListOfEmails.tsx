import React, { useEffect } from "react";
import s from './ListOfEmails.module.scss';
import { useAppDispatch } from "../../redux/hooks";
import { EmailsApi } from "../../services/api";



const ListOfEmails: React.FC = () => {

    const api = new EmailsApi();
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(api.getEmails())
    }, [dispatch])
    return (
        <div>
            <h3 className={s.title}>List Of Your Emails</h3>
            <table>

            </table>
        </div>
    )
}

export default ListOfEmails;