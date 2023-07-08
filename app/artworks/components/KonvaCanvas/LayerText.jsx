import { Text } from 'react-konva'
/**
 *
 * @param {object} payload
 * @param {} payload.layers
 * @returns
 */
const LayerText = ({ layer, onClick }) => {

    return (
        <Text
            {...layer}
            onTap={onClick}
            onClick={onClick}
            onDragStart={onClick}
            draggable
            preventDefault={true}
            globalCompositeOperation="source-atop"
        />
    )
}

export default LayerText

