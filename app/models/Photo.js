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
    }
});

module.exports = model('Photo', PhotoSchema);