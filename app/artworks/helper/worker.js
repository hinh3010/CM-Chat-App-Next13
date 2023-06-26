import Psd from "@webtoon/psd";
import Bluebird from "bluebird";
import { canvasToBlob, generateCanvasUseWorker } from ".";
import { WORKER_PARSE_ARTWORK } from "../const";
import { validateMessage } from "./messaging";

self.addEventListener("message", async ({ data }) => {
    const { message, timestamp, value } = data;

    validateMessage(data);

    console.log(
        `It took %d ms to send this message (main → worker, message: %o)`,
        Date.now() - timestamp,
        message
    );

    if (message === WORKER_PARSE_ARTWORK) {
        console.time("Parse PSD file");
        const psd = Psd.parse(value);
        console.timeEnd("Parse PSD file");

        console.log({ psd });
        let index = 1
        let level = 0
        const artworkLayers = []
        let currGroupId = null
        /**
         * @param {import('@webtoon/psd').NodeChild[]} nodeChild
         */
        async function drawLayers(nodeChild, group = {}) {
            await Bluebird.each(nodeChild, async (layer) => {
                if (layer.isHidden) return

                const { width, height, left, top, name, text, composedOpacity, type } = layer
                console.log("🚀 ~ file: worker.js:36 ~ awaitBluebird.each ~ layer:", layer)
                const { groupId } = layer.layerProperties?.layerProperties || {}

                if (type === 'Layer') {
                    const compositeBuffer = await layer.composite()

                    const canvas = await generateCanvasUseWorker({
                        composite: compositeBuffer,
                        width,
                        height,
                    })
                    console.log("🚀 ~ file: worker.js:47 ~ awaitBluebird.each ~ canvas:", canvas)

                    const blob = await canvasToBlob(canvas)
                    const imageURL = URL.createObjectURL(blob)
                    artworkLayers.push({
                        width,
                        height,
                        name,
                        type: text ? 'text' : 'image',
                        font: '6442624a7ada62d544e52468',
                        image: imageURL,
                        size: blob.size,
                        text: text || '',
                        x: left,
                        y: top,
                        index: index++,
                        level: group.level || 0,
                        groupName: group.name || null,
                        metadata: {
                            opacity: composedOpacity || 1,
                        },
                    })
                } else if (type === 'Group') {
                    await drawLayers(layer.children, { level: level++, name })
                }
            })
        }

        await drawLayers(psd.children)

        console.log('done drawing', artworkLayers)

        // for (const [index, layer] of psd.layers.entries()) {
        //     console.time(`Compositing layer ${index}`);
        //     const pixelData = await layer.composite(true, true);
        //     console.timeEnd(`Compositing layer ${index}`);

        //     self.postMessage(
        //         createMessage(WORKER_PARSE_LAYER_ARTWORK, {
        //             pixelData,
        //             name: layer.name,
        //             left: layer.left,
        //             top: layer.top,
        //             width: layer.width,
        //             height: layer.height,
        //         }),
        //         [pixelData.buffer]
        //     );
        // }
    } else {
        console.error(`Worker received a message that it cannot handle: %o`, data);
    }
});
