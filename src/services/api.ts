import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IUserData {
    username: string,
    email: string,
    password: string
}

interface IResults {
    id: number,
    username: string,
    email: string,
    password: string
}

axios.defaults.baseURL = "http://68.183.74.14:4005/api/";

export const authority = {
    set(data: {username: string, password: string}) {
        const basicAuth = 'Basic ' + btoa(data.username + ':' + data.password);
        return { Authorization: basicAuth };
    },
    unset() {
      axios.defaults.headers.common.Authorization = "";
    },
  };

export class EmailsApi {
    private emails = 'emails/';
    private users = 'users/';

    private setAuth = (user:{username: string, password: string}) => {
        axios.defaults.headers.common.Authorization = authority.set(user).Authorization;
    }

    register = createAsyncThunk<IResults, IUserData, {rejectValue: any}>(
        "user/signup",
        async (user, {rejectWithValue}) => {
            try {
                const { data } = await axios.post(`${this.users}`, user);
                if (data.username) this.setAuth({username: data.username, password: user.password})
                return {...data, password: user.password};
            } catch (error: any) {
                return rejectWithValue(error.status);
            } 
        }
    );

    login = createAsyncThunk<IResults, {username: string, password: string}, {rejectValue: any}>(
        "user/login",
        async (user, {rejectWithValue}) => {
            
            console.log(user)
            try {
                const { data } = await axios.get(`${this.users}current/`, { headers: authority.set(user) });
                
                return {...data, ...user};
            } catch (error: any) {
                console.log(error)
                authority.unset()
                return rejectWithValue(error.status);
            } 
        }
    )
}