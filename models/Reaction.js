const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            Required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => timestamp.format('MM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters:true,
        },
        id: false,
    }
)

model.exports = reactionSchema;