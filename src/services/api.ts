import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IState } from "../interfaces/interfaces";

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
    getAuth(data: {username: string, password: string}) {
        const basicAuth = 'Basic ' + btoa(data.username + ':' + data.password);
        return { Authorization: basicAuth };
    },
    set(data: {username: string, password: string}) {
        const basicAuth = 'Basic ' + btoa(data.username + ':' + data.password);
        axios.defaults.headers.common.Authorization=basicAuth;
    },
    unset() {
      axios.defaults.headers.common.Authorization = "";
    },
  };

export class EmailsApi {
    private emails = 'emails';
    private users = 'users/';

    register = createAsyncThunk<IResults, IUserData, {rejectValue: any}>(
        "user/signup",
        async (user, {rejectWithValue}) => {
            try {
                const { data } = await axios.post(`${this.users}`, user);
                if (data.username) authority.set({username: data.username, password: user.password})
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
                const { data } = await axios.get(`${this.users}current/`, { headers: authority.getAuth(user) });
                if (data.username) authority.set(user)
                return {...data, ...user};
            } catch (error: any) {
                console.log(error)
                authority.unset()
                return rejectWithValue(error.response.status);
            } 
        }
    )

    refresh = createAsyncThunk<IResults, {username: string, password: string}, {rejectValue: any}>(
        "user/refresh",
        async (user, { rejectWithValue}) => {
            if(!user.username) {
                console.log('no user')
                return rejectWithValue('')}
            try {
                const { data } = await axios.get(`${this.users}current/`, { headers: authority.getAuth(user) });
                authority.set(user)
                return data;
            } catch (error: any) {
                console.log(error)
                authority.unset()
                return rejectWithValue(error.status);
            } 
        }
    )

    getEmails = createAsyncThunk<IResults, undefined, {rejectValue: any}>(
        "emails/all",
        async (_, { rejectWithValue}) => {
            
            try {
                const { data } = await axios.get(`${this.emails}`);
                return data;
            } catch (error: any) {
                console.log(error)
                return rejectWithValue(error.status);
            } 
        }
    )
}