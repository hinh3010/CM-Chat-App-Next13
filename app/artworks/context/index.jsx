'use client'
import React, { useContext, useReducer } from 'react'

const initState = {
    stageRef: null
}

export const changeStageRef = (referent) => ({
    type: 'changeStageRef',
    payload: referent,
})

const artworkReducer = (state, action) => {
    switch (action.type) {
        case 'changeStageRef':
            return {
                ...state,
                stageRef: action.payload,
            }
        default:
            return state
    }
}

const ArtworkLibraryContext = React.createContext()

export const ArtworkLibraryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(artworkReducer, initState)

    const value = {
        state,
        dispatch,
    }

    return <ArtworkLibraryContext.Provider value={value}>{children}</ArtworkLibraryContext.Provider>
}

/**
 *
 * @returns {{dispatch: Function, state: IInitState}}
 */
export const useArtworkLibrary = () => {
    const value = useContext(ArtworkLibraryContext)

    if (value === undefined) {
        throw new Error('useArtworkLibrary must be called within ArtworkContext')
    }

    return value
}
