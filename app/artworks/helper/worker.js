import Psd from "@webtoon/psd";
import { getArtworkLayers, getArtworkLayers2 } from ".";
import { WORKER_PARSE_ARTWORK, WORKER_PARSE_LAYER_ARTWORK } from "../const";
import { createMessage, validateMessage } from "./messaging";

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

        /**
        * @type {Uint8ClampedArray}
        */
        const composite = await psd.composite(true, true)

        const artworkContainer = {
            width: psd.width,
            height: psd.height,
            image: composite,
            opacity: psd.composedOpacity,
            totalLayers: psd.layers.length,
            mimetype: psd.type
        }

        const artworkLayers = await getArtworkLayers(psd.children)

        const artworkPayloads = [artworkContainer, ...artworkLayers]

        console.timeEnd("Parse PSD file");

        self.postMessage(
            createMessage(WORKER_PARSE_LAYER_ARTWORK, artworkPayloads)
        );
    } else {
        console.error(`Worker received a message that it cannot handle: %o`, data);
    }
});
