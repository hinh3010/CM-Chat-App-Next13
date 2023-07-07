import ArtworkService from "./services";
import ArtworkValidator from "./validates";

class ArtworkController {
    constructor() {
        /**
         * @private
         */
        this.service = new ArtworkService();

        /**
        * @private
        */
        this.validator = ArtworkValidator
    }

    /**
     * Creates a new artwork.
     * @param {Request} request - The HTTP request.
     * @returns {Promise<object>} A Promise that resolves to the created artwork object.
     */
    async createArtwork(request) {
        const body = await request.json();
        const vBody = this.validator.validateBeforeCreateArtwork(body);
        return await this.service.createArtwork(vBody);
    }

    /**
     * Searches for artworks.
     * @param {Request} request - The HTTP request.
     * @returns {Promise<Array<object>>} A Promise that resolves to an array of artwork objects.
     */
    async searchArtworks() {
        // const url = new URL(request.url);
        // const searchParams = new URLSearchParams(url.search);
        const vPayload = this.validator.validateBeforeSearchArtworks({});
        return await this.service.searchArtworks(vPayload);
    }

    /**
     * Searches for artwork with id.
     * @param {Request} request - The HTTP request.
     * @returns {Promise<Array<object>>} A Promise that resolves to an array of artwork objects.
     */
    async searchArtworkById(request, id) {
        return await this.service.searchArtworkById({ id });
    }
}

export default ArtworkController;