import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'
import { createWrapper } from 'next-redux-wrapper';

// Create the Redux store with the reducer and middleware
const store = configureStore({
    reducer
})

const makeStore = () => store

export const wrapper = createWrapper(makeStore);
export default store

export const dispatch = store.dispatch
export const getState = store.getState
