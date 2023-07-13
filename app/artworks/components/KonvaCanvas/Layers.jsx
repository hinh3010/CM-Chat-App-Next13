import { useRef, useState } from 'react'
import { Group, Layer, Rect, Transformer } from 'react-konva'
import LayerBackground from './LayerBackground'
import LayerImage from './LayerImage'
import LayerText from './LayerText'
/**
 *
 * @param {object} payload
 * @param {} payload.layers
 * @returns
 */
const Layers = ({ draggable, artworkContainer, artworkLayers }) => {

    const trRef = useRef()
    const grRef = useRef()
    const [rect, setRect] = useState(null)

    /**
     *
     * @param {import('konva/lib/Node').KonvaEventObject<Event>} event
    */
    const selectedLayer = (event) => {
        const targetNode = event.target
        const trNode = trRef.current
        if (!targetNode || !trNode) return

        // const { scaleX, scaleY, offsetX, offsetY } = targetNode.getAttrs()
        // targetNode.setAttrs({
        //     scaleX: scaleX * -1,
        //     scaleY: scaleY * -1,
        // })

        // console.log('attr', targetNode.getAttrs())
        // const rect = targetNode.getClientRect({ relativeTo: trNode })

        trNode.nodes([targetNode])
        trNode.moveToTop()
    }

    /**
     *
     * @param {import('konva/lib/Node').KonvaEventObject<Event>} event
    */
    const onDragMove = (event) => {
        const targetNode = event.target
        const grNode = grRef.current
        if (!targetNode || !grNode) return

        const { x, y, width, height } = targetNode.getClientRect({ relativeTo: grNode })

        const rectX = x + width / 2
        const rectY = y + height / 2
        const rectWidth = width
        const rectHeight = height

        const { x: bgX, y: bgY, width: bgWidth, height: bgHeight } = artworkContainer
        console.log({
            x: rectX, y: rectY, width: rectWidth, height: rectHeight, bgY
        })

        let newX = targetNode.x()
        let newY = targetNode.y()

        // if (rectWidth < bgX) {
        //     newX = rectWidth / -2
        // } else if (rectX > bgX + bgWidth) {
        //     newX = bgWidth + rectWidth / 2
        // }

        if (rectY < bgY / -2) {
            newY = rectHeight / -2
        }
        // else if (rectY > bgY + bgHeight) {
        //     newY = bgHeight + rectHeight / 2
        // }

        targetNode.position({ x: newX, y: newY })

        setRect({
            x: newX, y: newY, width: rectWidth, height: rectHeight
        })
    }

    return (
        <Layer
            listening={!draggable}
        >
            <Group  {...artworkContainer} ref={grRef}>
                {rect && <Rect
                    x={rect.x - 2}
                    y={rect.y - 2}
                    width={rect.width + 4}
                    height={rect.height + 4}
                    offsetX={rect.width / 2}
                    offsetY={rect.height / 2}
                    stroke={'red'}
                    strokeWidth={2}
                // visible={false}
                />}

                <LayerBackground container={{ ...artworkContainer, x: 0, y: 0 }} />

                {[...artworkLayers]?.reverse().map((layer, i) => {
                    return layer.type === 'text' && !layer.src ? (
                        <LayerText
                            key={i}
                            layer={layer}
                            onClick={selectedLayer}
                        />
                    ) : (
                        <LayerImage
                            key={i}
                            layer={layer}
                            onClick={selectedLayer}
                            onDragMove={onDragMove}
                        />
                    )
                })}
                <Transformer
                    ref={trRef}
                    keepRatio={true}
                    centeredScaling={true}
                    anchorCornerRadius={30}
                    rotateAnchorOffset={20}
                    enabledAnchors={[
                        'top-left',
                        'top-right',
                        'bottom-left',
                        'bottom-right',
                        // 'middle-right',
                        // 'middle-left',
                    ]}
                    rotateEnabled={true}
                    borderStroke={'blue'}
                    borderStrokeWidth={0.3}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 100 || newBox.height < 100) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            </Group>
        </Layer>
    )
}

export default Layers

