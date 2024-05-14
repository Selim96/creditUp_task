import React, { useEffect, useState } from "react";
import s from './ListOfEmails.module.scss';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EmailsApi } from "../../services/api";
import allSelectors from "../../redux/selectors";
import ReactPaginate from "react-paginate";


const api = new EmailsApi();

const ListOfEmails: React.FC = () => {
    const [offset, setOffset] = useState(0);
    

    const dispatch = useAppDispatch();
    const allEmails = useAppSelector(allSelectors.getAllEmails)
    const count = useAppSelector(allSelectors.getCount)
    const sendedData = useAppSelector(allSelectors.getSendedData)

    const pageCount = Math.ceil(count / api.pageLimit());

    const handlePageClick = (e: any) => {
        setOffset(e.selected * api.pageLimit());
      };

    useEffect(()=> {
        dispatch(api.getEmails(offset))
    }, [dispatch, sendedData, offset])

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
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                // forcePage={currentPage - 1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={s.pagination}
                activeClassName={s.active}
                pageClassName={s.page}
                nextClassName={s.next}
                previousClassName={s.prev}
            />
            
        </div>
    )
}

export default ListOfEmails;