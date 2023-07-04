import ArtworkService from "./services";
import { validateBeforeCreateArtwork } from "./validates";

class ArtworkController {
    constructor() {
        /**
         * @private
         */
        this.service = new ArtworkService();
    }

    /**
     * Creates a new artwork.
     * @param {Request} request - The HTTP request.
     * @returns {Promise<object>} A Promise that resolves to the created artwork object.
     */
    async createArtwork(request) {
        const body = await request.json();
        const vBody = validateBeforeCreateArtwork(body);
        return await this.service.createArtwork(vBody);
    }

    /**
     * Searches for artworks.
     * @param {Request} request - The HTTP request.
     * @returns {Promise<Array<object>>} A Promise that resolves to an array of artwork objects.
     */
    async searchArtworks(request) {
        const url = new URL(request.url);
        console.log("🚀 ~ file: controllers.js:30 ~ ArtworkController ~ searchArtworks ~ url:", url)
        const searchParams = new URLSearchParams(url.search);
        console.log("🚀 ~ file: controllers.js:31 ~ ArtworkController ~ searchArtworks ~ searchParams:", searchParams)
        return await this.service.searchArtworks();
    }
}

export default ArtworkController;