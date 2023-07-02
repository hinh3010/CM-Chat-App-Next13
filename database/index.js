import mongoose from 'mongoose';
import { SCHEMAS_MODEL } from './schemas';

const createConnectDB = (uri, dbName) => {
    const mongodb = mongoose.createConnection(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: true,
            // socketTimeoutMS: 60000,
            // connectTimeoutMS: 30000,
            // serverSelectionTimeoutMS: 5000,
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

const _getModel = (connection) => (collection = '', options = {}) => {
    if (connection.models[collection]) return connection.models[collection]

    const opts = validatedOptions(options);
    if (opts.plugin && typeof opts.plugin === 'function') Schema.plugin(opts.plugin);

    const Schema = SCHEMAS_MODEL[collection]
    return connection.model(collection, Schema);
}

const createConnect = (connection) => ({
    getModel: _getModel(connection),
    getConnection: () => connection,
});

export { createConnect, createConnectDB };

