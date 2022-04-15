const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    idFacebook: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    photo: String,
    status: { type: Boolean, default: true },
    rol: { type: String, default: 'USER', enum: ['ADMIN', 'USER', 'PARTICIPANT']}
});

UserSchema.methods.toJSON = function () {
    const {__v, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);