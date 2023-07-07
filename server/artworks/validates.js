import Joi from 'joi';

const typeAccept = ["Psd"]

export default class ArtworkValidator {
    static validateBeforeCreateArtwork(payload) {
        const schema = Joi.object({
            mimetype: Joi.string().valid(...typeAccept).required(),
            name: Joi.string().required(),
            width: Joi.number().integer().required(),
            height: Joi.number().integer().required(),
            totalLayers: Joi.number().integer().max(30).required(),
            opacity: Joi.number().min(0).max(1).default(1),
            image: Joi.string().uri().required(),
            layers: Joi.string().required(),
        })

        const { error, value } = schema.validate(payload)

        if (error) {
            throw new Error(error.message ?? error)
        }

        return value
    }

    static validateBeforeSearchArtworks(payload) {
        const schema = Joi.object({
            limit: Joi.number().integer().default(36),
            page: Joi.number().integer().default(1),
        })

        const { error, value } = schema.validate(payload)

        if (error) {
            throw new Error(error.message ?? error)
        }

        return value
    }
}