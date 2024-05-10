import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EmailsApi } from "../../services/api";
import { useAppDispatch } from "../../redux/hooks";

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

    return (
        <div style={{padding: '80px'}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="login" value={login} onChange={handlChange}/>
                <input type="text" name="password" value={password} onChange={handlChange}/>
                <button type="submit">Login</button>
            </form>
            <p>If you have not account <Link to={"/signUp"}>Sign Up</Link></p>
        </div>
    )
}

export default Login;