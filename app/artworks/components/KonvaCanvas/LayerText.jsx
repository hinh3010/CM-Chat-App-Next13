import { Text } from 'react-konva'
/**
 *
 * @param {object} payload
 * @param {} payload.layers
 * @returns
 */
const LayerText = ({ layer, onClick, onDragMove }) => {

    return (
        <Text
            {...layer}
            onTap={onClick}
            onClick={onClick}
            onDragStart={onClick}
            draggable
            preventDefault={true}
            globalCompositeOperation="source-atop"
            onDragMove={onDragMove}
            onDragEnd={onDragMove}
        />
    )
}

export default LayerText

