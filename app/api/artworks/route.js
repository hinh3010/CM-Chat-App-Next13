import { NextResponse } from "next/server";
import { createConnect, createConnectDB } from "~/database";
/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function POST(request) {
    try {
        const data = await request.formData()
        console.log("🚀 ~ file: route.js:13 ~ POST ~ data:", data.get('file'))

        // const connect = createConnectDB(process.env.MONGO_URI, 'artworks');
        // const { getModel } = createConnect(connect)
        // const Artwork = getModel("Artwork");
        // const artworks = await Artwork.find().limit(10);

        // const body = await request.json();
        // console.log("🚀 ~ file: route.js:12 ~ POST ~ body:", body)

        return NextResponse.json({ artworks: 'artworks' });
    } catch (error) {
        console.log("🚀 ~ file: route.js:34 ~ POST ~ error:", error)
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