import { createAction, createReducer } from '@reduxjs/toolkit'
import reduxConstant from '../constant'

const createArtworkTemplates = createAction(`${reduxConstant.artworkDetail}/create-templates`)
const reset = createAction(`${reduxConstant.artworkDetail}/reset`)
const selectLayerIds = createAction(`${reduxConstant.artworkDetail}/select-layer-ids`)
const editorContainer = createAction(`${reduxConstant.artworkDetail}/editor-container`)

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
    editorContainer: {
        width: 0,
        height: 0,
        ref: null
    }
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
            .addCase(editorContainer, (state, { payload }) => {
                state.editorContainer = { ...state.editorContainer, ...payload }
            })
    },
)

// Actions
export const artworkDetailActions = { createArtworkTemplates, reset, selectLayerIds, editorContainer }
export const artworkDetailSelector = state => state[reduxConstant.artworkDetail]
export default artworkDetailReducer