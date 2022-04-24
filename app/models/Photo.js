const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
    description: String,
    url: { type: String, required: [true, "Url is required"] },
    status: { type: Boolean, default: true },
    validate: { type: Boolean, default: false },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    contest: {
        type: Schema.Types.ObjectId,
        ref: 'Contest'
    },
    votes: { type: Number, default: 0},
    userVotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = model('Photo', PhotoSchema);