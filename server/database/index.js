import mongoose from 'mongoose';
import { SCHEMAS_MODEL } from './schemas';
import { SimpleLogger } from '@hellocacbantre/logger';

// const createConnectDB = (uri, dbName) => {
//     const mongodb = mongoose.createConnection(uri,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             ssl: true,
//             sslValidate: true,
//             // socketTimeoutMS: 60000,
//             // connectTimeoutMS: 30000,
//             // serverSelectionTimeoutMS: 5000,
//             dbName: dbName
//         })

//     mongodb.on('connected', function () {
//         SimpleLogger.info(`[MongoDb:::] connected ${this.name}.db!!`)
//     })
//     mongodb.on('disconnected', function () {
//         SimpleLogger.warn(`[MongoDb:::] disconnected ${this.name}.db!!`)
//     })
//     mongodb.on('error', function (_, err) {
//         SimpleLogger.error(
//             err,
//             `[MongoDb:::] Failed to connect ${this.name}.db!! ${err.message}`
//         )
//     })
//     SimpleLogger.log('MongoDB connected');
//     return mongodb
// };

// const validatedOptions = (options = {}) => Object.assign({ plugin: null }, options);

// const _getModel = (connection) => (collection = '', options = {}) => {
//     if (connection.models[collection]) return connection.models[collection]

//     const opts = validatedOptions(options);
//     if (opts.plugin && typeof opts.plugin === 'function') Schema.plugin(opts.plugin);

//     const Schema = SCHEMAS_MODEL[collection]
//     return connection.model(collection, Schema);
// }

// const createConnect = (connection) => ({
//     getModel: _getModel(connection),
//     getConnection: () => connection,
// });

// export { createConnect, createConnectDB };


/**

Creates a new MongoDB connection using the given URI and database name.
@param {string} uri - The MongoDB connection URI.
@param {string} dbName - The name of the database to connect to.
@returns {mongoose.Connection} - The new MongoDB connection.
*/
const createConnectDB = (uri, dbName) => {
    const mongodb = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: true,
        dbName: dbName
    });
    mongodb.on('connected', function () {
        SimpleLogger.info(`[MongoDb::: ] connected ${this.name}.db!!`);
    });
    mongodb.on('disconnected', function () {
        SimpleLogger.warn(`[MongoDb::: ] disconnected ${this.name}.db!!`);
    });
    mongodb.on('error', function (_, err) {
        SimpleLogger.error(
            err,
            `[MongoDb::: ] Failed to connect ${this.name}.db!! ${err.message}`
        );
    });
    return mongodb;
};

/**

Validates the given options object and returns a new options object with a plugin property.
@param {object} options - The options object to validate.
@returns {object} - The validated options object.
*/
const validatedOptions = (options = {}) => Object.assign({ plugin: null }, options);
/**

Returns a function that creates or retrieves a Mongoose model based on the given collection name and options.
@param {mongoose.Connection} connection - The Mongoose connection to use.
*/
const _getModel = (connection) => (collection = '', options = {}) => {
    if (connection.models[collection]) return connection.models[collection];
    const opts = validatedOptions(options);
    if (opts.plugin && typeof opts.plugin === 'function') Schema.plugin(opts.plugin);

    const Schema = SCHEMAS_MODEL[collection];
    return connection.model(collection, Schema);
};

/**

Creates a new object that provides access to Mongoose models and connections.
@param {mongoose.Connection} connection - The Mongoose connection to use.
*/
const createConnect = (connection) => ({
    getModel: _getModel(connection),
    getConnection: () => connection,
});
export { createConnect, createConnectDB };
