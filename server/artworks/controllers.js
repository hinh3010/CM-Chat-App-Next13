import { createConnect, createConnectDB } from "../database";
import { validateBeforeCreateArtwork } from "./validates"

/**
 * 
 * @param {Request} request 
 * @returns 
 */
export const createArtwork = async (request) => {
    const body = await request.json()
    const vBody = validateBeforeCreateArtwork(body)

    const connect = createConnectDB(process.env.MONGO_URI, 'artworks');
    const { getModel } = createConnect(connect)
    const Artwork = getModel("Artwork");

    const artworks = await Artwork.create(vBody)

    console.log("🚀 ~ file: controllers.js:11 ~ createArtwork ~ vBody:", artworks)
}
