import { Image as ImageKonva } from 'react-konva'
import useImage from 'use-image'

/**
 *
 * @param {object} payload
 * @param {} payload.layers
 * @returns
 */
const LayerImage = ({ layer, onClick, onDragMove }) => {
    const [image] = useImage(layer.src, 'anonymous', 'origin')

    return (
        <ImageKonva
            {...layer}
            image={image}
            onTap={onClick}
            onClick={onClick}
            onDragStart={onClick}
            draggable
            preventDefault={true}
            // cornerRadius={20}
            globalCompositeOperation="source-atop"
            onDragMove={onDragMove}
        />
    )
}

export default LayerImage

