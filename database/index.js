import mongoose from 'mongoose';
import path from 'path';
import { SCHEMAS_MODEL } from './schemas';

const createConnectDB = (uri, dbName) => {
    const mongodb = mongoose.createConnection(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: true,
            socketTimeoutMS: 60000,
            connectTimeoutMS: 30000,
            serverSelectionTimeoutMS: 5000,
            dbName: dbName
        })

    mongodb.on('connected', function () {
        console.info(`[MongoDb:::] connected ${this.name}.db!!`)
    })
    mongodb.on('disconnected', function () {
        console.warn(`[MongoDb:::] disconnected ${this.name}.db!!`)
    })
    mongodb.on('error', function (_, err) {
        console.error(
            err,
            `[MongoDb:::] Failed to connect ${this.name}.db!! ${err.message}`
        )
    })
    console.log('MongoDB connected');
    return mongodb
};

const validatedOptions = (options = {}) => Object.assign({ plugin: null }, options);

const _getModel = (connection, schemasDir) => (collection = '', options = {}) => {
    console.log("🚀 ~ file: index.js:37 ~ schemasDir:", schemasDir)
    if (!SCHEMAS_MODEL[collection]) throw new Error('Model ' + collection + ' not found')
    const opts = validatedOptions(options);
    const file = path.join(schemasDir, `${collection}.js`);
    console.log("🚀 ~ file: index.js:41 ~ file:", file)
    const Schema = require(file).default;
    console.log("🚀 ~ file: index.js:43 ~ Schema:", Schema)
    if (opts.plugin && typeof opts.plugin === 'function') Schema.plugin(opts.plugin);
    return connection.models[collection] || connection.model(collection, Schema);
};

const createConnect = (connection, schemasDir = path.join(process.cwd(), 'database/schemas')) => ({
    getModel: _getModel(connection, schemasDir),
    getConnection: () => connection,
});

const getModel = (connection) => (collection, Schema) => {
    console.log('\n\n\n')
    const schemasDir = path.join(__dirname, './schemas')
    const file = path.join(schemasDir, `Artwork.js`);
    const Schema2 = require(file).default;
    console.log("🚀 ~ file: index.js:58 ~ getModel ~ file:", file)
    console.log("🚀 ~ file: index.js:59 ~ getModel ~ Schema2:", Schema2)
    return connection.models[collection] || connection.model(collection, Schema);
}

export { createConnectDB, createConnect, getModel };
