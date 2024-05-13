import React, { useEffect } from "react";
import s from './ListOfEmails.module.scss';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EmailsApi } from "../../services/api";
import allSelectors from "../../redux/selectors";



const ListOfEmails: React.FC = () => {
    const api = new EmailsApi();
    const dispatch = useAppDispatch();
    const allEmails = useAppSelector(allSelectors.getAllEmails)
    const sendedData = useAppSelector(allSelectors.getSendedData)

    useEffect(()=> {
        dispatch(api.getEmails())
    }, [dispatch, sendedData])

    return (
        <div className={s.main}>
            <h3 className={s.title}>List Of Your Emails</h3>
            <table >
                <thead >
                    <tr className={s.headRow}>
                        <th>Email ID</th>
                        <th>Recipient</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {allEmails.length === 0 ? 
                    <tr><td colSpan={3}>You have not send any emails</td></tr> : 
                    allEmails.map(({id, recipient, subject})=>
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{recipient}</td>
                        <td>{subject}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default ListOfEmails;