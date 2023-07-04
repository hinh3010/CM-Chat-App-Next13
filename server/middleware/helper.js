const { NextResponse } = require("next/server");
const { createConnectDB, createConnect } = require("~/server/database");

function withConnect(databaseName) {
    try {
        const connect = createConnectDB(process.env.MONGO_URI, databaseName);
        const { getModel } = createConnect(connect);

        return getModel
    } catch (error) {
        return new NextResponse("Server is not connected", { status: 500, error: error.message });
    }
}