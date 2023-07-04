import { NextResponse } from "next/server";
import ArtworkController from "~/server/artworks/controllers";

const artworkController = new ArtworkController();

/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function POST(request) {
    try {
        const newArtwork = await artworkController.createArtwork(request)

        return NextResponse.json({ artwork: newArtwork });
    } catch (error) {
        console.log("🚀 ~ file: route.js:16 ~ POST ~ error:", error.message)
        return new NextResponse("Internal Error", { status: error.status || 500, error: error.message });
    }
}

/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function GET(request) {
    try {
        const artworks = await artworkController.searchArtworks(request)
        return NextResponse.json({ artworks });
    } catch (error) {
        console.log("🚀 ~ file: route.js:27 ~ GET ~ error:", error.message)
        return new NextResponse("Internal Error", { status: error.status || 500, error: error.message });
    }
}