import { createAction, createReducer } from '@reduxjs/toolkit'
import reduxConstant from '../constant'

const createArtworkTemplates = createAction(`${reduxConstant.artworkDetail}/create-templates`)

const initialState = {
    pending: false,
    status: null,
    message: null,
    userInfo: {},
    authentication: false
}

const artworkDetailReducer = createReducer(
    initialState,
    (builder) => {
        builder
            .addCase(createArtworkTemplates, (state) => {
                state.message = null
                state.userInfo = {}
                state.authentication = false
            })
    },
)

// Actions
export const artworkDetailActions = { createArtworkTemplates }
export const artworkDetailSelector = state => state[reduxConstant.artworkDetail]
export default artworkDetailReducer