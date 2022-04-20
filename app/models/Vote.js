const { Schema, model } = require('mongoose');

const VoteSchema = new Schema({
    userIp: String,
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    },
    date: { type: Date, default: Date.now}
});

module.exports = model('Vote', VoteSchema);