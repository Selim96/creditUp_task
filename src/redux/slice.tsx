import { createSlice, PayloadAction  } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import  {IState} from "../interfaces/interfaces";
import {EmailsApi} from '../services/api';

const api = new EmailsApi();

const initialState: IState = {
  isLogedIn: false,
  user: {
    id: -1,
    username: '',
    email: '',
    password: ''
  },
  allEmails: [],
  loading: false,
  error: false
  
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(api.register.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(api.register.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      console.log(payload)
    });
    builder.addCase(api.register.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      toast.error("Error")
    });

    builder.addCase(api.login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(api.login.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      console.log(payload)
      state.isLogedIn = true;
      state.user = payload;
    });
    builder.addCase(api.login.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      console.log(payload)
      toast.error("Error")
    });
  }
})

const reducer = todoSlice.reducer

export const {  } = todoSlice.actions
export default reducer