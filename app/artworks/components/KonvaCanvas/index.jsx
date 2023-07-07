import { useRef } from 'react'
import { Stage } from 'react-konva'
import Layers from './Layers'
import { useSelector } from 'react-redux';
import { artworkDetailSelector } from '~/stores/reducers/artworkDetail.reducer';

export default function KonvaCanvas() {

    const { ratio, editorContainer, draggable, artworkLayers, artworkContainer } = useSelector(artworkDetailSelector);

    const stageRef = useRef(null)

    /**
    * Zoom in or out based on mouse wheel event
    * @param {MouseEvent} e - The mouse event
    */
    const onZoom = (e) => {
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

    return (
        <Stage
            ref={stageRef}
            // onClick={onDeAttach}
            width={editorContainer.width}
            height={editorContainer.height}
            scaleX={ratio}
            scaleY={ratio}
            draggable={draggable}
            onWheel={onZoom}
            style={{ cursor: draggable ? 'grabbing' : 'pointer' }}
        >
            {!!artworkLayers.length && artworkContainer && (
                <Layers
                    layers={artworkLayers}
                    draggable={draggable}
                />
            )}
        </Stage>
    )
}
