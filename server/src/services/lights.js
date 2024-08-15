const { isObjectIdOrHexString } = require('mongoose');
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
    price: Number(data.price).toFixed(2),
    date: data.date,
    quantities: Math.floor(Number(data.quantities)),
    imageURL: data.downloadURL,
    height: Number(data.height).toFixed(2),
    width: Number(data.width).toFixed(2),
    depth: Number(data.depth).toFixed(2)
  });

  if (data.maxHeight) {
    record.maxHeight = Number(data.maxHeight).toFixed(2);
  }

  if (data.kelvins) {
    record.kelvins = Math.floor(Number(data.kelvins));
    record.lumens = Math.floor(Number(data.lumens));
    record.watt = Math.floor(Number(data.watt));
  } else {
    record.bulbType = data.bulbType;
    record.bulbsRequired = Math.floor(Number(data.bulbsRequired));
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
  record.price = Number(data.price).toFixed(2);
  record.date = data.date;
  record.quantities = Math.floor(Number(data.quantities));
  record.imageURL = data.downloadURL;
  record.height = Number(data.height).toFixed(2);
  record.width = Number(data.width).toFixed(2);
  record.depth = Number(data.depth).toFixed(2);

  if (Number(data.maxHeight)) {
    record.maxHeight = Number(data.maxHeight).toFixed(2);
  } else {
    record.maxHeight = data.maxHeight;
  }

  if (Number(data.kelvins)) {
    record.kelvins = Math.floor(Number(data.kelvins));
    record.lumens = Math.floor(Number(data.lumens));
    record.watt = Math.floor(Number(data.watt));
  } else {
    record.kelvins = data.kelvins;
    record.lumens = data.lumens;
    record.watt = data.watt;
  }

  if (Number(data.bulbsRequired)) {
    record.bulbsRequired = Math.floor(Number(data.bulbsRequired));
  } else {
    record.bulbsRequired = data.bulbsRequired;
  }
  
  record.bulbType = data.bulbType;
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

async function getUserCartLights(lightsId) {
  return Light.find({ '_id': { $in : lightsId  } } ).lean();
}

async function removeLightFromUserCart(lightId) {
  await User.updateMany({ },
    { $pull: { cart: { $in: [ lightId ] } } }
  );
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
  getUserCart,
  getUserCartLights,
  removeLightFromUserCart
};
