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
        dimensions: data.dimensions,
        imageURL: data.downloadURL,
        ownerId: ownerId
    });

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