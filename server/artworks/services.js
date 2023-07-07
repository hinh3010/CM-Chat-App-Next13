import { createConnect, createConnectDB } from "../database";
const connect = createConnectDB(process.env.MONGO_URI, 'artworks');

class ArtworkService {
    /**
     * @constructor
     */
    constructor() {
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
    async searchArtworks(payload) {
        const Artwork = this._getModel("Artwork");

        const { limit, page } = payload;

        const query = {}
        const skip = limit * (page - 1)

        const totalDocs = await Artwork.countDocuments(query)
        const docs = await Artwork.find(query).lean().skip(skip).limit(limit).sort({ created_at: -1 });

        const totalPages = Math.ceil(totalDocs / limit)

        return { docs, totalDocs, limit, page, totalPages }
    }

    /**
     * Returns all artworks from the database.
     * @returns {Promise<Array<object>>}
     */
    async searchArtworkById(payload) {
        const Artwork = this._getModel("Artwork");

        const { id } = payload;

        const doc = await Artwork.findById(id).lean();

        return doc
    }
}

export default ArtworkService;