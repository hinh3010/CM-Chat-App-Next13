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

const getModel = (modelName, schemasDir = path.join(__dirname, './schemas')) => {
    if (!SCHEMAS_MODEL[modelName]) throw new Error('Model ' + modelName + ' not found')
    const schemaPath = path.join(schemasDir, `${modelName}.js`);
    const schema = require(schemaPath).default;
    return mongoose.model(modelName, schema);
};

export { createConnectDB, getModel };