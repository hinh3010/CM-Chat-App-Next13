import Joi from 'joi';

const typeAccept = ['image/png', "image/jpeg", "image/jpg"]

export const validateImageUploadToCloud = (payload) => {
    const schema = Joi.object({
        size: Joi.number().max(1024 * 1024 * 20).required(),
        type: Joi.string().valid(...typeAccept)
    })

    const { error, value } = schema.validate(payload)

    if (error) {
        throw new Error(error.message ?? error)
    }
    return value
}

