import { connectDB, getModel } from ".";

(async function getStaticProps() {
    connectDB();

    const Artwork = getModel('Artwork');

    const artworks = await Artwork.find().sort({}).limit(10);

    return {
        artworks
    };
})()