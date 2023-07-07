import { NextResponse } from "next/server";
import ArtworkController from "~/server/artworks/controllers";

const artworkController = new ArtworkController();

/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function GET(request, { params }) {
    try {
        const artwork = await artworkController.searchArtworkById(request, params.id)
        return NextResponse.json(artwork)
    } catch (error) {
        return new NextResponse(error.message, { status: error.status || 500 });
    }
}