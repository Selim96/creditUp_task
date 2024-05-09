import { createSlice, PayloadAction  } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import  {IState} from "../interfaces/interfaces"

const initialState: IState = {
  isLogedIn: false,
  user: {
    id: -1,
    username: '',
    email: '',
    password: ''
  },
  allEmails: [],
  
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    
    
  },
})

const reducer = todoSlice.reducer

export const {  } = todoSlice.actions
export default reducer