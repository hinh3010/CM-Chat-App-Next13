import { Layer } from 'react-konva'
/**
 *
 * @param {object} payload
 * @param {} payload.layers
 * @returns
 */
const Layers = ({ layers, draggable }) => {

    return (
        <Layer listening={!draggable} willReadFrequently>
            {[...layers]?.reverse().map((layer) => {
                console.log({ layer })
            })}
        </Layer>
    )
}

export default Layers

