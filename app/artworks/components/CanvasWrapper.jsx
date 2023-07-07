'use client'

import { useEffect, useRef } from "react";
import { debounce } from "~/helper";
import { dispatch } from "~/stores";
import { artworkDetailActions } from "~/stores/reducers/artworkDetail.reducer";
import { transformArtworkData } from "../helper";
import FabricCanvas from "./FabricCanvas";

const CanvasWrapper = ({ dataArtwork }) => {

    const editorWrapperRef = useRef()

    useEffect(() => {
        const handleResize = debounce(() => {
            if (editorWrapperRef.current) {
                let { offsetWidth, offsetHeight } = editorWrapperRef.current
                dispatch(artworkDetailActions.editorContainer({
                    width: offsetWidth,
                    height: offsetHeight
                }))
            }
        })

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (!dataArtwork) return
        let { offsetWidth, offsetHeight } = editorWrapperRef.current
        const transformedArtwork = transformArtworkData(dataArtwork, {
            offsetWidth,
            offsetHeight,
        })
        dispatch(artworkDetailActions.createArtworkTemplates(transformedArtwork))
    }, [dataArtwork])

    return (
        <div className="w-full h-full border flex flex-col bg-white rounded-2xl">
            <div className="w-full h-14">

            </div>
            <div
                className="flex-1"
                style={{
                    background: `
                        linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),
                        linear-gradient(45deg, white 25%, rgb(218, 218, 218) 25%, rgb(218, 218, 218) 75%, white 75%, white)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                }}
                ref={editorWrapperRef}
            >
                <FabricCanvas />
            </div >
            <div className="w-full h-20">

            </div>
        </div >
    );
}

export default CanvasWrapper;