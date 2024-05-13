import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EmailsApi } from "../../services/api";
import { useAppDispatch } from "../../redux/hooks";
import s from "./Login.module.scss"

const api = new EmailsApi()

const Login: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch()

    const handlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toString();
        switch(e.target.name) {
            case "login":
                setLogin(value);
                break;
            case "password":
                setPassword(value)
                break;
            default:
                return;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch(api.login({ username: login, password }))
        setLogin('')
        setPassword('')
    }

    const disabled = login && password;

    return (
        <div style={{padding: '80px'}}>
            <h2 className={s.title}>Login</h2>
            <form onSubmit={handleSubmit} className={s.form}>
                <label htmlFor="login">Login</label>
                <input type="text" name="login" id="login" value={login} onChange={handlChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handlChange} required/>
                <button type="submit" disabled={!disabled} style={!disabled ? {opacity: "0.5"}: {}} className={s.button}>Login</button> 
            </form>
            <p className={s.redirect}>If you have not account <Link to={"/signUp"}>Sign Up</Link></p>
        </div>
    )
}

export default Login;