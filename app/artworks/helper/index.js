import axios from "axios";
import { randomId } from "~/helper";

export const downloadJSON = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const convertBase64ToBlob = (base64, type = "png") => {
    const binaryData = Buffer.from(base64.split(",")[1], "base64");
    return new Blob([binaryData], { type: `image/${type}` });
};

/**
 * @param {string} url
 * @returns {Promise<Blob | null>}
 */
export async function fetchBlob(url) {
    try {
        const response = await fetch(url);
        return response.blob();
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * @param {string} staticFile
 * @param {URL|string} targetUrl
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadBinary = async (staticFile, targetUrl) => {
    try {
        const blob = await fetchBlob(staticFile);
        if (!blob) return { url: null, error: "Static file not found" };

        const fileReader = new FileReader();
        await new Promise((resolve, reject) => {
            fileReader.onload = function () {
                resolve();
            };
            fileReader.onerror = function () {
                reject(fileReader.error);
            };
            fileReader.readAsArrayBuffer(blob);
        });

        const buffer = fileReader.result;
        const response = await axios.put(targetUrl, buffer, {
            headers: {
                "Content-Type": "image/png",
            },
        });
        return { data: response, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};

/**
 * @param {string} staticFile
 * @param {URL|string} url
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadBlob = async (staticFile) => {
    try {
        const blob = await fetchBlob(staticFile);
        const response = await axios.put('/upload', blob, {
            headers: {
                'Content-Type': blob.type
            }
        })
        return { data: response, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};


/**
 *
 * @param {File} file
 * @returns
 */
export const readFileAsArrayBuffer = (file) => {
    if (file.arrayBuffer) {
        return file.arrayBuffer();
    } else {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        return (
            new Promise() <
            ArrayBuffer >
            ((resolve) => {
                reader.addEventListener("load", (event) => {
                    if (event.target) {
                        resolve(event.target.result);
                    } else {
                        throw new Error("Loaded file but event.target is null");
                    }
                });
            })
        );
    }
};

/**
 *
 * @param {object} data
 * @param {Uint8ClampedArray} data.composite
 * @param {number} data.width
 * @param {number} data.height
 * @param {number|undefined} data.x
 * @param {number|undefined} data.y
 * @returns {Promise<Blob>}
 */
export const generateBlobUseOffscreenCanvas = async (data) => {
    const { width, height, composite, x = 0, y = 0 } = data;

    // Check if composite is a Uint8ClampedArray
    if (!(composite instanceof Uint8ClampedArray)) {
        throw new Error("Invalid composite data");
    }

    // In worker must use OffscreenCanvas because there is no document element
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");

    // Draw pictures on canvas
    const imageData = new ImageData(composite, width, height);
    context.putImageData(imageData, x, y);

    return canvas.convertToBlob();
};

/**
 *
 * @param {object} data
 * @param {Uint8ClampedArray} data.compositeBuffer
 * @param {number} data.width
 * @param {number} data.height
 * @param {number|undefined} data.x
 * @param {number|undefined} data.y
 * @returns {Promise<Blob>}
 */
export const generateBlob = async (data) => {
    const { width, height, composite, x = 0, y = 0 } = data;

    // Check if composite is a Uint8ClampedArray
    if (!(composite instanceof Uint8ClampedArray)) {
        throw new Error("Invalid composite data");
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    // Draw pictures on canvas
    const imageData = new ImageData(composite, width, height);
    // const imageData = context.createImageData(width, height)
    // imageData.data.set(composite)

    context.putImageData(imageData, x, y);

    return convertToBlob(canvas);
};

/**
 * @param {HTMLCanvasElement} data
 * @returns {Promise<Blob>}
 */
export const convertToBlob = async (canvasEl) => {
    const blob = await new Promise((resolve) => {
        canvasEl.toBlob((blob) => resolve(blob));
    });
    return blob;
};

/**
 * @param {import('@webtoon/psd').NodeChild[]} psdLayers
 */
export const getArtworkLayers = async (psdLayers) => {
    let index = 1;
    /**
     * @param {import('@webtoon/psd').NodeChild[]} nodeChild
     */
    async function drawLayers(nodeChild, group = null) {
        const artworkLayers = [];

        for (const layer of nodeChild) {
            if (layer.isHidden) continue;

            const {
                width,
                height,
                left,
                top,
                name,
                text = null,
                composedOpacity = 1,
                type,
            } = layer;

            if (type === "Layer") {
                /**
                 * @type {Uint8ClampedArray}
                 */
                const composite = await layer.composite(true, true);

                const artworkLayer = {
                    width,
                    height,
                    name,
                    type: text ? "text" : "image",
                    font: null,
                    image: composite,
                    text: text,
                    x: left,
                    y: top,
                    index: index++,
                    opacity: composedOpacity,
                    _id: randomId()
                };

                if (group && typeof group === "object") {
                    artworkLayer.opacity = composedOpacity * group.opacity;
                    artworkLayer.groupId = group.id;
                }

                artworkLayers.push(artworkLayer);
            } else if (type === "Group") {
                const groupId = layer.layerFrame && layer.layerFrame.id;

                const groupAttr = {
                    opacity: composedOpacity,
                    id: groupId,
                };
                const artworkLayerItems = await drawLayers(layer.children, groupAttr);
                artworkLayers.push(...artworkLayerItems);
            }
        }

        return artworkLayers;
    }

    const artworkLayers = await drawLayers(psdLayers);
    return artworkLayers;
};

export const isSupportedWorker = () =>
    !!window.Worker && typeof Worker !== "undefined";
export const isSupportedOffscreenCanvas = () =>
    !!window.OffscreenCanvas && typeof OffscreenCanvas !== "undefined";

/**
 * @param {import('@webtoon/psd').NodeChild[]} psdLayers
 */
export const getArtworkLayers2 = async (psdLayers) => {
    let index = 1;
    /**
     * @param {import('@webtoon/psd').NodeChild[]} nodeChild
     */
    async function drawLayers(nodeChild) {
        const artworkLayers = [];

        for (const layer of nodeChild) {
            if (layer.isHidden) continue;

            const {
                width,
                height,
                left,
                top,
                name,
                text = null,
                composedOpacity = 1,
                type,
            } = layer;

            if (type === "Layer") {
                /**
                 * @type {Uint8ClampedArray}
                 */
                const composite = await layer.composite(true, true);

                const artworkLayer = {
                    width,
                    height,
                    name,
                    type: text ? "text" : "image",
                    font: null,
                    image: composite,
                    text: text,
                    x: left,
                    y: top,
                    index: index++,
                    opacity: composedOpacity,
                    type: "Layer",
                };

                artworkLayers.push(artworkLayer);
            } else if (type === "Group") {
                layer;
                const groupId = layer.layerFrame && layer.layerFrame.id;

                const artworkLayerItems = await drawLayers(layer.children);
                artworkLayers.push({
                    children: artworkLayerItems,
                    name: name,
                    opacity: composedOpacity,
                    type: "Group",
                    id: groupId,
                });
            }
        }

        return artworkLayers;
    }

    const artworkLayers = await drawLayers(psdLayers);
    return artworkLayers;
};



/**
 * calculate the ratio by size of the components and object resized accordingly
 * @param {object} targetSize
 * @param {number} targetSize.width
 * @param {number} targetSize.height
 * @param {object} currentSize
 * @param {number} currentSize.width
 * @param {number} currentSize.height
 * @param {object|undefined} options
 * @param {number} options.distance
 * @returns
 */
export const calcRatio = (targetSize, currentSize, options) => {
    const { distance = 0 } = options || {}
    const widthRatio = (targetSize.width - distance) / currentSize.width
    const heightRatio = (targetSize.height - distance) / currentSize.height
    return Math.min(widthRatio, heightRatio)
}

/**
 * 
 * @param {URL} image 
 * @param {number} retryCount 
 * @returns 
 */
export const loadImage = (image, retryCount = 0) => {
    return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            const timer = setTimeout(() => {
                clearTimeout(timer)
                resolve(img)
            }, 1000)
        }
        img.onerror = () => {
            if (retryCount < 3) {
                setTimeout(() => {
                    loadImage(image, retryCount + 1)
                        .then(resolve)
                        .catch(reject)
                }, 1000)
            } else {
                reject(new Error('Error loading image'))
            }
        }
        img.src = image
    })
}

/**
 *
 * @param {Object} dataArtwork
 * @param {Object} container
 * @param {number} container.offsetWidth
 * @param {number} container.offsetHeight
 * @returns
 */
export const transformArtworkData = (dataArtwork, container) => {
    const { width, height, name, layers } = dataArtwork

    const { offsetWidth, offsetHeight } = container

    const distance = 50
    const ratio = calcRatio(
        { width: offsetWidth, height: offsetHeight },
        { width, height },
        { distance: distance }
    )

    const bgX = offsetWidth / 2 / ratio - width / 2
    const bgY = offsetHeight / 2 / ratio - height / 2

    const artworkLayers = (JSON.parse(layers)).map((layer) => {
        const {
            x: layerX,
            y: layerY,
            width: layerWidth,
            height: layerHeight,
            image: imageLayer,
            fontSize,
            metadata = {},
            ...rest
        } = layer
        const centerWidth = layerWidth / 2
        const centerHeight = layerHeight / 2

        const newLayer = {
            ...rest,
            fontSize: Number(fontSize) || 24 / ratio,
            src: imageLayer,
            width: layerWidth,
            height: layerHeight,
            scaleX: 1,
            scaleY: 1,
            x: layerX + centerWidth,
            y: layerY + centerHeight,
            offsetX: centerWidth,
            offsetY: centerHeight,
            modified: false,
            rotation: Number(metadata.rotation) || 0,
        }
        return newLayer
    })

    const transformedArtwork = {
        artworkContainer: {
            width: width,
            height: height,
            name: name,
            x: bgX,
            y: bgY
        },
        artworkLayers,
        ratioDefault: ratio,
    }

    return transformedArtwork
}
