'use client'

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { artworkDetailActions, artworkDetailSelector } from "~/stores/reducers/artworkDetail.reducer";

const Canvas = () => {
    const { artworkContainer, artworkLayers } = useSelector(artworkDetailSelector)
    console.log("🚀 ~ file: ListLayers.jsx:11 ~ ListLayers ~ selectLayerIds:", artworkLayers)
    const dispatch = useDispatch()

    const editorWrapperRef = useRef()

    useEffect(() => {
        const handleResize = () => {
            if (editorWrapperRef.current) {
                // dispatch(artworkDetailActions.editorContainer({width: 0, height: 0}))
                let { offsetWidth, offsetHeight } = editorWrapperRef.current
                console.log("🚀 ~ file: Canvas.jsx:19 ~ handleResize ~ offsetWidth, offsetHeight :", offsetWidth, offsetHeight)
                dispatch(artworkDetailActions.editorContainer({
                    width: offsetWidth,
                    height: offsetHeight
                }))
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [dispatch])

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
                <span
                    className="text-3xl font-medium cursor-pointer"
                >
                    Canvas
                </span>
            </div >
            <div className="w-full h-20">

            </div>
        </div >
    );
}

export default Canvas;