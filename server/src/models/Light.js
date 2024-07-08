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
    quantities: {
        type: Number,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    minHeight: {
        type: Number
    },
    maxHeight: {
        type: Number
    },
    kelvins: {
        type: Number
    },
    lumens: {
        type: Number
    },
    watt: {
        type: Number
    },
    bulbType: {
        type: String
    },
    bulbsRequired: {
        type: Number
    },
    notes: {
        type: String
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User',
      },
});
const Light = model('lights', LightSchema);
Light.createIndexes();

module.exports = { Light };