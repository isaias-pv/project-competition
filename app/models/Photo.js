const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
    description: { type: String, default: 'No description' },
    url: { type: String, required: [true, "Url is required"] },
    name: { type: String },
    validation: { type: Boolean, default: false },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
    // contest: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Contest'
    // }
});

module.exports = model('Photo', PhotoSchema);