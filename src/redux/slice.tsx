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
  error: false,
  isModalOpen: false
}

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    toggleModal: (state, actions:PayloadAction<boolean>) =>{
      state.isModalOpen = actions.payload;
    },
    logout: (state) => {
      state.isLogedIn = false;
      state.user = {
        id: -1,
        username: '',
        email: '',
        password: ''
      }
      state.allEmails = [];
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
      state.isLogedIn = true;
      state.user= payload;
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
      state.isLogedIn = true;
      state.user = payload;
    });
    builder.addCase(api.login.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      if(payload === 401) {
        toast.error("Wrong credantials!")
      } else {
        toast.error("Error")
      }
    });
    builder.addCase(api.refresh.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(api.refresh.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.isLogedIn = true;
      
    });
    builder.addCase(api.refresh.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(api.getEmails.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(api.getEmails.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      console.log(payload)
      state.allEmails = payload.results
    });
    builder.addCase(api.getEmails.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(api.sendEmails.pending, (state, {payload}) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(api.sendEmails.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      console.log(payload)
      toast.done("Email is sended!")
    });
    builder.addCase(api.sendEmails.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      toast.error("Something went wrong!")
    });
  }
})

const reducer = emailsSlice.reducer

export const { logout, toggleModal, } = emailsSlice.actions
export default reducer