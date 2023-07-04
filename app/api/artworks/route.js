import { NextResponse } from "next/server";
import { createArtwork } from "~/server/artworks/controllers";
import { createConnect, createConnectDB } from "~/server/database";
/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function POST(request) {
    try {
        const newArtwork = await createArtwork(request)

        return NextResponse.json({ artwork: newArtwork });
    } catch (error) {
        console.log("🚀 ~ file: route.js:34 ~ POST ~ error:", error.message)
        return new NextResponse("Internal Error", { status: 500, error: error.message });
    }
}

export async function GET() {
    try {
        const connect = createConnectDB(process.env.MONGO_URI, 'artworks');
        const { getModel } = createConnect(connect)
        const Artwork = getModel("Artwork");

        const artworks = await Artwork.find().limit(10);

        return NextResponse.json({ artworks });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500, error: error.message });
    }
}