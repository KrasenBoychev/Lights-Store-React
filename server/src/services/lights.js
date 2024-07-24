const { Light } = require('../models/Light');
const { User } = require('../models/User');

async function getAll() {
  return Light.find().lean();
}

async function getByOwnerId(id) {
  return Light.find({ ownerId: id }).lean();
}

async function getCustomersLights() {
  return Light.find({ ownerId: { $ne: '668cfe59f18d95a1f2f52a13' } });
}

async function getMarketplaceLights(userId) {
  if (userId) {
    return Light.find({
      ownerId: { $nin: ['668cfe59f18d95a1f2f52a13', userId] },
    });
  } else {
    return Light.find({ ownerId: { $ne: '668cfe59f18d95a1f2f52a13' } });
  }
}

async function getLightById(id) {
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

  record.ownerId = ownerId;

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
  record.minHeight = data.minHeight;
  record.maxHeight = data.maxHeight;
  record.kelvins = data.kelvins;
  record.lumens = data.lumens;
  record.watt = data.watt;
  record.bulbType = data.bulbType;
  record.bulbsRequired = data.bulbsRequired;
  record.notes = data.notes;

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

async function getUserCart(userId) {
  return User.findById(userId).lean();
}

async function addLightToCart(lightId, userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ReferenceError('Record not found ' + userId);
  }

  user.cart.push(lightId);

  await user.save();

  return user;
}

module.exports = {
  getAll,
  getLightById,
  create,
  update,
  deleteById,
  getByOwnerId,
  getCustomersLights,
  getMarketplaceLights,
  addLightToCart,
  getUserCart
};
