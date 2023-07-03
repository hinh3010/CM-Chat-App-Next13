import { SimpleLogger } from "@hellocacbantre/logger";
import { NextResponse } from "next/server";
import { uploadCloudinary } from "~/server/upload/controllers";

/**
 * 
 * @param {Request} request 
 * @returns 
 */
export async function POST(request) {
    try {
        const fileUrl = await uploadCloudinary(request)
        return NextResponse.json({ fileUrl: fileUrl });
    } catch (error) {
        SimpleLogger.error("🚀 ~ file: route.js:34 ~ POST ~ error:", error)
        return new NextResponse("Internal Error", { status: error.status || 500, error: error.message });
    }
}