import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'

// Create the Redux store with the reducer and middleware
const store = configureStore({
    reducer
})

export default store

export const dispatch = store.dispatch
export const getState = store.getState
