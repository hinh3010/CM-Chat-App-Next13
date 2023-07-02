import { NextResponse } from "next/server";
import { createConnect, createConnectDB, getModel } from "~/database";
import ArtworkSchema from "~/database/schemas/Artwork";

export async function POST(request) {
    try {
        const connect = createConnectDB(process.env.MONGO_URI, 'artworks');
        const { getModel } = createConnect(connect)
        const Artwork = getModel("Artwork");
        const artworks = await Artwork.find().limit(10);

        const body = await request.json();
        console.log("🚀 ~ file: route.js:12 ~ POST ~ body:", body)

        return NextResponse.json({ artworks });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const connect = createConnectDB(process.env.MONGO_URI, 'artworks');
        console.log('connect:::::::::::::::')
        // const { getModel } = createConnect(connect)

        const Artwork = getModel(connect)('Artwork', ArtworkSchema)
        // const Artwork = getModel("Artwork");

        const artworks = await Artwork.find().limit(10);

        return NextResponse.json({ artworks });
    } catch (error) {
        console.log("🚀 ~ file: route.js:31 ~ GET ~ error:", error.message)
        return new NextResponse("Internal Error", { status: 500 });
    }
}
