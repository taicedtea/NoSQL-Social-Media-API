const { Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280,
        },
        username: {
            type: String,
            Required: true,
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        //     get: (timestamp) => timestamp.format('MM DD, YYYY [at] hh:mm a')
        // }
    },
    {
        toJSON: {
            getters:true,
        },
        id: false,
    }
)

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        //     get: (timestamp) => timestamp.format('MM DD, YYYY [at] hh:mm a')
        // },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;