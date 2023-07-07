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

        return NextResponse.json(newArtwork)
    } catch (error) {
        return new NextResponse(error.message, { status: error.status || 500 });
    }
}

/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function GET(request) {
    try {
        const data = await artworkController.searchArtworks(request)
        return NextResponse.json(data)
    } catch (error) {
        return new NextResponse(error.message, { status: error.status || 500 });
    }
}

