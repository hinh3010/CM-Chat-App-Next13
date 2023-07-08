import { useMemo } from 'react'
import { Rect } from 'react-konva'

/**
 *
 * @param {object} payload
 * @param {} payload.layers
 * @returns
 */
const LayerBackground = ({ container }) => {

    const caroCanvas = useMemo(() => {
        const caroCanvas = document.createElement('canvas')
        caroCanvas.width = 30
        caroCanvas.height = 30
        const ctx = caroCanvas.getContext('2d')
        ctx.fillStyle = '#f6f6f6'
        ctx.fillRect(0, 0, 30, 30)
        ctx.fillStyle = '#a9a9a9'
        ctx.fillRect(0, 0, 15, 15)
        ctx.fillRect(15, 15, 15, 15)
        return caroCanvas
    }, [])

    return (
        <Rect
            width={container.width}
            height={container.height}
            x={container.x}
            y={container.y}
            listening={false}
            fillPatternImage={caroCanvas}
            fillPatternRepeat="repeat"
        />
    )
}

export default LayerBackground

