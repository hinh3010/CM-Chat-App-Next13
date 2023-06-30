import { createConnectDB } from "~/database";

export const connectDB = () => createConnectDB(process.env.MONGO_URI, 'artworks')