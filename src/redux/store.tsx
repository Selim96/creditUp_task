import { configureStore } from "@reduxjs/toolkit"
import reducer from "./slice"
import { IUser } from "../interfaces/interfaces"


const saveToLocalStorage = (data: IUser | undefined): void => {
  try {
    localStorage.setItem('user_data', JSON.stringify(data))
  } catch (e) {
    console.error(e)
  }
}

const loadFromLocalStorage = (): any => {
  try {
    const dataStr = localStorage.getItem('user_data')
    return dataStr ? JSON.parse(dataStr) : null
  } catch (e) {
    console.error(e)
    return null
  }
}

const persistedStore = loadFromLocalStorage()

const store = configureStore({
  reducer,
  preloadedState: {
    isLogedIn: false,
    user: persistedStore,
    allEmails: [],
    loading: false,
    error: false
  },
})

store.subscribe(() => {
  saveToLocalStorage(store.getState().user)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch