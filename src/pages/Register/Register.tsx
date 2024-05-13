import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { EmailsApi } from "../../services/api";
import s from "./Register.module.scss"

const api = new EmailsApi()

const Register: React.FC = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch()

    const handlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toString().trim();
        switch(e.target.name) {
            case "login":
                setLogin(value);
                break;
            case "email":
                setEmail(value);
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
        dispatch(api.register({username: login, email, password}))
        setLogin('')
        setPassword('')
        setEmail('')
    }

    const disabled = login && email && password;

    return (
        <div style={{padding: '80px'}}>
            <h2 className={s.title}>Sing Up</h2>
            <form onSubmit={handleSubmit} className={s.form}>
                <label htmlFor="login">Login</label>
                <input type="text" name="login" id="login" value={login} onChange={handlChange}/>
                <label htmlFor="login">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={handlChange}/>
                <label htmlFor="login">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handlChange}/>
                <button type="submit" style={!disabled ? {opacity: "0.5"}: {}} className={s.button} disabled={!disabled}>Sign Up</button>
            </form>
            <p className={s.redirect}>If you alredy have account <Link to={"/login"}>Login</Link></p>
        </div>
    )
}

export default Register;