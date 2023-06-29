import { createAction, createReducer } from '@reduxjs/toolkit'
import reduxConstant from '../constant'

const createArtworkTemplates = createAction(`${reduxConstant.artworkDetail}/create-templates`)
const resetArtworkDetail = createAction(`${reduxConstant.artworkDetail}/reset`)

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
            .addCase(resetArtworkDetail, () => {
                return initialState
            })
            .addCase(createArtworkTemplates, (state) => {
                state.message = null
                state.userInfo = {}
                state.authentication = false
            })
    },
)

// Actions
export const artworkDetailActions = { createArtworkTemplates, resetArtworkDetail }
export const artworkDetailSelector = state => state[reduxConstant.artworkDetail]
export default artworkDetailReducer