import { useRef, useState } from 'react'
import { Layer, Rect, Transformer } from 'react-konva'
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
    const [rect, setRect] = useState(null)

    /**
     *
     * @param {import('konva/lib/Node').KonvaEventObject<Event>} event
    */
    const selectedLayer = (event) => {
        const targetNode = event.target
        const trNode = trRef.current
        if (!targetNode || !trNode) return

        // const { scaleX, scaleY, offsetX, offsetY, ratio } = targetNode.getAttrs()
        // targetNode.setAttrs({
        //     scaleX: scaleX * -1,
        //     scaleY: scaleY * -1,
        // })

        // console.log('attr', targetNode.getAttrs())
        // const rect = targetNode.getClientRect({ relativeTo: trNode })
        // // console.log({ rect })
        // setRect({
        //     x: rect.x / ratio,
        //     y: rect.y / ratio,
        //     width: rect.width / ratio,
        //     height: rect.height / ratio,
        // })

        trNode.nodes([targetNode])
        trNode.moveToTop()
    }

    return (
        <Layer
            listening={!draggable}
        >
            {rect && <Rect
                x={rect.x - 2}
                y={rect.y - 2}
                width={rect.width + 4}
                height={rect.height + 4}
                stroke={'red'}
                strokeWidth={2}
            />}
            <LayerBackground container={artworkContainer} />
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
                        layer={{
                            // listening: layer.type === 'text',
                            ...layer,
                        }}
                        onClick={selectedLayer}
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
        </Layer>
    )
}

export default Layers

