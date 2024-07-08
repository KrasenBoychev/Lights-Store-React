const { Light } = require('../models/Light');

async function getAll() {
    return Light.find().lean();
}

// async function getByOwnerId(id) {
//     return Furniture.find({ ownerId: id }).lean();
// }

// async function getById(id) {
//     return Furniture.findById(id).lean();
// }

async function create(data, ownerId) {
    const record = new Light({
        name: data.name,
        price: data.price,
        date: data.date,
        quantities: data.quantities,
        dimensions: data.dimensions,
        imageURL: data.downloadURL,
        ownerId: ownerId
    });

    if (data.minHeight) {
        record.minHeight = data.minHeight;
        record.maxHeight = data.maxHeight;
    }

    if (data.kelvins) {
        record.kelvins = data.kelvins;
        record.lumens = data.lumens;
        record.watt = data.watt;
    } else {
        record.bulbType = data.bulbType;
        record.bulbsRequired = data.bulbsRequired;
    }

    if (data.notes) {
        record.notes = data.notes;
    }

    await record.save();

    return record;
}

// async function update(id, data, userId) {
//     const record = await Furniture.findById(id);

//     if (!record) {
//         throw new ReferenceError('Record not found ' + id);
//     }

//     if (record.ownerId.toString() != userId) {
//         throw new Error('Access denied');
//     }

//     record.make = data.make;
//     record.model = data.model;
//     record.year = data.year;
//     record.description = data.description;
//     record.price = data.price;
//     record.img = data.img;
//     record.material = data.material;

//     await record.save();

//     return record;
// }

// async function deleteById(id, userId) {
//     const record = await Furniture.findById(id);

//     if (!record) {
//         throw new ReferenceError('Record not found ' + id);
//     }

//     if (record.ownerId.toString() != userId) {
//         throw new Error('Access denied');
//     }

//     await Furniture.findByIdAndDelete(id);
// }

module.exports = {
    getAll,
    // getById,
     create,
    // update,
    // deleteById,
    // getByOwnerId
};