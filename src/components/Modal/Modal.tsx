import React, { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleModal } from "../../redux/slice";
import allSelectors from "../../redux/selectors";
import { EmailsApi } from "../../services/api";
import closeIcon from '../../images/clear.png';

const modalRoot = document.querySelector('#modal-root');

const api = new EmailsApi()

const Modal = (): React.ReactPortal | null => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputSubject, setInputSubject] = useState('')
  const [inputText, setInputText] = useState('')

  const dispatch = useAppDispatch()
  const {id, username, email} = useAppSelector(allSelectors.getUser)
  const closeModalByEsc = useCallback(
    (e: any) => {
      if (e.code === "Escape") {
        dispatch(toggleModal(false))
      }
    },
    [dispatch]
  );

  const closeByBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleModal(false))
    }
  };

  const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch(e.target.name) {
      case "recipient" :
        setInputEmail(e.target.value)
        break;
      case "subject" :
        setInputSubject(e.target.value)
        break;
      case "message" :
        setInputText(e.target.value)
        break;
      default: 
        return;
    }
  }

  const submitForm = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(api.sendEmails({ 
      sender: id, 
      recipient: inputEmail, 
      subject:inputSubject, 
      message: inputText
    }));
    setInputEmail('')
    setInputSubject('')
    setInputText('')
    dispatch(toggleModal(false))
  }

  useEffect(() => {
    window.addEventListener("keydown", closeModalByEsc);
    return () => {
      window.removeEventListener("keydown", closeModalByEsc);
    };
  }, [closeModalByEsc]);

  if(modalRoot) {return createPortal(
    <div className={s.overlay} onClick={closeByBackdropClick}>
      <div className={s.modal}>
        <img src={closeIcon} alt="close" className={s.closeImg} onClick={closeByBackdropClick}/>
        <h3 className={s.title}>Send message form</h3>
        <p className={s.sender}>Sender email: <span>{email}</span></p>
        <form className={s.modal_form} onSubmit={submitForm}>
          <label htmlFor="recipient">
            Recipient
          </label>
          <input type="email" id='recipient' name="recipient" value={inputEmail} onChange={changeInputs} required/>
          <label htmlFor="subject">
            Subject
          </label>
          <input type="text" id='subject' name="subject" value={inputSubject} onChange={changeInputs} required/>
          <label htmlFor="message">
            Message
          </label>
          <input type="text" id='message' name="message" value={inputText} onChange={changeInputs} required/>
          <button type="submit" className={s.button}>Send</button>
        </form>
      </div>
    </div>,
    modalRoot,
  );} else { return null}
};

export default Modal;
