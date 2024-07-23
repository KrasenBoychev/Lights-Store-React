const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cart: {
        type: Array,
        default: []
    }
});
const User = model('users', UserSchema);
User.createIndexes();

module.exports = { User };