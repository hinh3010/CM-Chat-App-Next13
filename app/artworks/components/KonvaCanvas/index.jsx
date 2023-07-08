import { useEffect, useRef, useState } from 'react';
import { Stage } from 'react-konva';
import { useSelector } from 'react-redux';
import { artworkDetailSelector } from '~/stores/reducers/artworkDetail.reducer';
import Layers from './Layers';

export default function KonvaCanvas({ editorContainer }) {

    const { ratio, artworkLayers, artworkContainer } = useSelector(artworkDetailSelector);

    const stageRef = useRef(null)

    /**
    * Zoom in or out based on mouse wheel event
    * @param {MouseEvent} e - The mouse event
    */
    const onZoom = (e) => {
        /**
         * @type {import('konva/lib/Stage'.Stage)}
         */
        const stage = stageRef.current
        // Get the amount of wheel movement
        const { deltaY } = e.evt

        // Get the current position of the mouse pointer on the stage
        const pointer = stage.getPointerPosition()

        const scaleFactor = deltaY < 0 ? 1.1 : 1 / 1.1

        // Calculate the new scale
        const newScaleX = stage.scaleX() * scaleFactor
        if (newScaleX < ratio || newScaleX > ratio * 10) return
        const newScaleY = stage.scaleY() * scaleFactor
        if (newScaleY < ratio || newScaleY > ratio * 10) return

        // Calculate the new position of the stage based on the current position of the mouse pointer
        const newX = pointer.x - (pointer.x - stage.x()) * scaleFactor
        const newY = pointer.y - (pointer.y - stage.y()) * scaleFactor

        stage.scale({ x: newScaleX, y: newScaleY })
        stage.position({ x: newX, y: newY })
        stage.batchDraw()
    }

    const [draggable, setDraggable] = useState(false)

    useEffect(() => {
        /**
          * @type {import('konva/lib/Stage'.Stage)}
          */
        const stage = stageRef.current
        if (!stage) return

        const handleKeyDown = (event) => {
            const { keyCode } = event || {}

            if (keyCode === 32 /* space */) {
                setDraggable(true)
            }
        }
        const handleKeyUp = (event) => {
            const { keyCode } = event || {}
            if (keyCode === 32 /* space */) {
                setDraggable(false)
            }
        }

        const handleWheel = (event) => {
            if (event.ctrlKey) {
                event.preventDefault()
            }
        }

        const handleResize = (event) => {
            event.preventDefault()
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('resize', handleResize)
        window.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('wheel', handleWheel)
        }
    }, [])

    return (
        <Stage
            ref={stageRef}
            width={editorContainer.width}
            height={editorContainer.height}
            scaleX={ratio}
            scaleY={ratio}
            draggable={draggable}
            onWheel={onZoom}
            style={{ cursor: draggable ? 'grabbing' : 'pointer' }}
        >
            {!!artworkLayers.length && !!artworkContainer && (
                <Layers
                    artworkLayers={artworkLayers}
                    artworkContainer={artworkContainer}
                    draggable={draggable}
                />
            )}
        </Stage>
    )
}
