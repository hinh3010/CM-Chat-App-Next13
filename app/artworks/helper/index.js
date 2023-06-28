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

/**
 *
 * @param {object} data
 * @param {Uint8ClampedArray} data.composite
 * @param {number} data.width
 * @param {number} data.height
 * @param {number|undefined} data.x
 * @param {number|undefined} data.y
*/
//  * @returns {HTMLCanvasElement}
export const generateCanvasUseWorker = async (data) => {
    const { width, height, composite, x = 0, y = 0 } = data

    // In worker
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");

    // Check if composite is a Uint8ClampedArray
    if (!(composite instanceof Uint8ClampedArray)) {
        throw new Error("Invalid composite data");
    }

    // Draw pictures on canvas
    const imageData = new ImageData(composite, width, height)
    context.putImageData(imageData, x, y)

    return canvas.convertToBlob()
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

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height

    // const imageData = context.createImageData(width, height)
    // imageData.data.set(composite)
    const imageData = new ImageData(composite, width, height)

    context.putImageData(imageData, x, y)

    return canvas
}

/**
 * @param {HTMLCanvasElement} canvas
 * @returns {Promise<Blob>}
 */
export const canvasToBlob = async (canvas) => {
    console.log("🚀 ~ file: index.js:175 ~ canvasToBlob ~ canvas:", canvas)
    const blob = await new Promise((resolve, reject) => {
        // canvas.toBlob((blob) => resolve(blob))
        canvas.toBlob(function (blob) {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error("Failed to convert canvas to blob"));
            }
        }, "image/png");
    })

    return blob
}
