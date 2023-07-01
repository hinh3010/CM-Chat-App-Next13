import { Schema } from 'mongoose'

const ArtworkSchema = new Schema(
    {
        name: { type: String, required: true },
        mimetype: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        opacity: { type: Number, default: 1 },
        totalLayers: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        layers: { type: String, required: true },
        meta: { type: Schema.Types.Mixed, required: false }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

export default ArtworkSchema