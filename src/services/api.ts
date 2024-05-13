import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISendData, IEmail } from "../interfaces/interfaces";



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

interface IResponse {
    count: number,
    next: null | string,
    previous: null | string,
    results: []
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
    private emails = 'emails/';
    private users = 'users/';
    private limit = 10;
    private offset = 0;

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

    getEmails = createAsyncThunk<IResponse, number, {rejectValue: any}>(
        "emails/all",
        async (offset, { rejectWithValue}) => {
            
            try {
                const { data } = await axios.get(`${this.emails}?limit=${this.limit}&offset=${offset}`);
                return data;
            } catch (error: any) {
                console.log(error)
                return rejectWithValue(error.status);
            } 
        }
    )

    sendEmails = createAsyncThunk<IEmail, ISendData, {rejectValue: any}>(
        "emails/send",
        async (sendData, { rejectWithValue}) => {
            
            try {
                const { data } = await axios.post(`${this.emails}`, sendData);
                return data;
            } catch (error: any) {
                console.log(error)
                return rejectWithValue(error.status);
            } 
        }
    )

    pageLimit() {
        return this.limit;
    }
    pageOffset() {
        return this.offset;
    }
    changeOffset(num: number) {
        this.offset = num;
    }
}