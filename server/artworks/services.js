import { createConnect, createConnectDB } from "../database";

class ArtworkService {
    /**
     * @constructor
     */
    constructor() {
        const connect = createConnectDB(process.env.MONGO_URI, 'artworks');
        /**
         * @private
         */
        this._getModel = createConnect(connect).getModel;
    }

    /**
     * Creates a new artwork in the database.
     * @param {object} payload
     * @returns {Promise<object>}
     */
    async createArtwork(payload) {
        const Artwork = this._getModel("Artwork");
        const newArtwork = await Artwork.create(payload);
        return newArtwork;
    }

    /**
     * Returns all artworks from the database.
     * @returns {Promise<Array<object>>}
     */
    async searchArtworks() {
        const Artwork = this._getModel("Artwork");
        const artworks = await Artwork.find().lean();
        return artworks;
    }
}

export default ArtworkService;