import axios from 'axios'

export const downloadJSON = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export const convertBase64ToBlob = (base64, type = 'png') => {
    const binaryData = Buffer.from(base64.split(',')[1], 'base64')
    return new Blob([binaryData], { type: `image/${type}` })
}

/**
 *
 * @param {object} data
 * @param {Uint8ClampedArray} data.composite
 * @param {number} data.width
 * @param {number} data.height
 * @param {number|undefined} data.x
 * @param {number|undefined} data.y
 * @returns {HTMLCanvasElement}
 */
export const generateCanvas = (data) => {
    const { width, height, composite, x = 0, y = 0 } = data

    const canvasEl = document.createElement('canvas')
    const context = canvasEl.getContext('2d')

    canvasEl.width = width
    canvasEl.height = height

    // const imageData = context.createImageData(width, height)
    // imageData.data.set(composite)
    const imageData = new ImageData(composite, width, height)

    context.putImageData(imageData, x, y)

    return canvasEl
}

/**
 * @param {HTMLCanvasElement} data
 * @returns {Promise<Blob>}
 */
export const canvasToBlob = async (canvasEl) => {
    const blob = await new Promise((resolve) => {
        canvasEl.toBlob((blob) => resolve(blob))
    })

    return blob
}

/**
 * @param {string} url
 * @returns {Promise<Blob | null>}
 */
export async function fetchBlob(url) {
    try {
        const response = await fetch(url)
        return response.blob()
    } catch (error) {
        console.error(error)
        return null
    }
}

// /**
//  * @param {string} staticFile
//  * @param {URL|string} url
//  *  @param {Function} callback - The callback function to handle the result and error.
//  */
// export const uploadBinary = async (staticFile, url, callback) => {
//     const blob = await fetchBlob(staticFile)
//     if (!blob) callback(null, 'Static file not found')

//     const fileReader = new FileReader()
//     fileReader.onload = function () {
//         const buffer = fileReader.result
//         axios
//             .put(url, buffer, {
//                 headers: {
//                     'Content-Type': 'image/png',
//                 },
//             })
//             .then((response) => {
//                 callback(response.config.url?.split('?')[0], null)
//                 return response
//             })
//             .catch((error) => {
//                 callback(null, error)
//             })
//     }
//     fileReader.onerror = function () {
//         callback(null, fileReader.error)
//     }
//     fileReader.readAsArrayBuffer(blob)
// }

/**
 * @param {string} staticFile
 * @param {URL|string} url
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadBinary = async (staticFile, url) => {
    try {
        const blob = await fetchBlob(staticFile)
        if (!blob) return { url: null, error: 'Static file not found' }

        const fileReader = new FileReader()
        await new Promise((resolve, reject) => {
            fileReader.onload = function () {
                resolve()
            }
            fileReader.onerror = function () {
                reject(fileReader.error)
            }
            fileReader.readAsArrayBuffer(blob)
        })

        const buffer = fileReader.result
        const response = await axios.put(url, buffer, {
            headers: {
                'Content-Type': 'image/png',
            },
        })
        return { data: response.config.url?.split('?')[0], error: null }
    } catch (error) {
        return { data: null, error: error.message }
    }
}

/**
 *
 * @param {File} file
 * @returns
 */
export const readFileAsArrayBuffer = (file) => {
    if (file.arrayBuffer) {
        return file.arrayBuffer()
    } else {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)

        return (
            new Promise() <
            ArrayBuffer >
            ((resolve) => {
                reader.addEventListener('load', (event) => {
                    if (event.target) {
                        resolve(event.target.result)
                    } else {
                        throw new Error('Loaded file but event.target is null')
                    }
                })
            })
        )
    }
}

export const capitalizeText = (text) => {
    return text && text.charAt(0).toUpperCase() + text.slice(1)
}
