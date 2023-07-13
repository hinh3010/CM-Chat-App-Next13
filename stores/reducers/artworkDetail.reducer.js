import { createAction, createReducer } from '@reduxjs/toolkit'
import reduxConstant from '../constant'

const createArtworkTemplates = createAction(`${reduxConstant.artworkDetail}/create-templates`)
const reset = createAction(`${reduxConstant.artworkDetail}/reset`)
const selectLayerIds = createAction(`${reduxConstant.artworkDetail}/select-layer-ids`)
const changeStageRef = createAction(`${reduxConstant.artworkDetail}/change-stage-ref`)

const initialState = {
    artworkLayers: [],
    ratioDefault: 1,
    artworkContainer: {
        width: 0,
        height: 0,
        name: '',
        mimeType: 'psd',
        image: '',
    },
    selectLayerIds: [],
    stageRef: null
}

const artworkDetailReducer = createReducer(
    initialState,
    (builder) => {
        builder
            .addCase(reset, () => {
                return initialState
            })
            .addCase(createArtworkTemplates, (state, { payload }) => {
                state.artworkLayers = payload.artworkLayers
                state.artworkContainer = payload.artworkContainer
                state.ratioDefault = payload.ratioDefault
            })
            .addCase(selectLayerIds, (state, { payload }) => {
                state.selectLayerIds = payload
            })
            .addCase(changeStageRef, (state, { payload }) => {
                console.log("🚀 ~ file: artworkDetail.reducer.js:39 ~ .addCase ~ payload:", payload)
                // state.stageRef = payload
            })
    },
)

// Actions
export const artworkDetailActions = { createArtworkTemplates, reset, selectLayerIds, changeStageRef }
export const artworkDetailSelector = state => state[reduxConstant.artworkDetail]
export default artworkDetailReducer