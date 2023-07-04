import Joi from 'joi';

const typeAccept = ["Psd"]

export const validateBeforeCreateArtwork = (payload) => {
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

