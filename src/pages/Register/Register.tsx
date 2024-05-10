import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { EmailsApi } from "../../services/api";

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
            <h2>Sing Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="login" value={login} onChange={handlChange}/>
                <input type="email" name="email" value={email} onChange={handlChange}/>
                <input type="password" name="password" value={password} onChange={handlChange}/>
                <button type="submit" disabled={!disabled}>Sign Up</button>
            </form>
            <p>If you alredy have account <Link to={"/login"}>Login</Link></p>
        </div>
    )
}

export default Register;