const { Schema, model, Types } = require('mongoose');

const LightSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
      },
});
const Light = model('lights', LightSchema);
Light.createIndexes();

module.exports = { Light };