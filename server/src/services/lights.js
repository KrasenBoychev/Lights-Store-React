const { Light } = require('../models/Light');

async function getAll() {
  return Light.find().lean();
}

async function getByOwnerId(id) {
  return Light.find({ ownerId: id }).lean();
}

async function getCustomersLights() {
  return Light.find({ ownerId: { $ne: '668cfe59f18d95a1f2f52a13' } });
}

async function getById(id) {
  return Light.findById(id).lean();
}

async function create(data, ownerId) {
  const record = new Light({
    name: data.name,
    price: data.price,
    date: data.date,
    quantities: data.quantities,
    dimensions: data.dimensions,
    imageURL: data.downloadURL,
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

  data.ownerId = ownerId;

  await record.save();

  return record;
}

async function update(id, data, userId) {
  const record = await Light.findById(id);

  if (!record) {
    throw new ReferenceError('Record not found ' + id);
  }

  if (record.ownerId.toString() != userId) {
    throw new Error('Access denied');
  }

  record.name = data.name;
  record.price = data.price;
  record.date = data.date;
  record.quantities = data.quantities;
  record.dimensions = data.dimensions;
  record.imageURL = data.downloadURL;

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

async function deleteById(id, userId) {
  const record = await Light.findById(id);

  if (!record) {
    throw new ReferenceError('Record not found ' + id);
  }

  if (record.ownerId.toString() != userId) {
    throw new Error('Access denied');
  }

  await Light.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getByOwnerId,
  getCustomersLights,
};
