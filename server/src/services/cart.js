const { Light } = require('../models/Light');
const { User } = require('../models/User');

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
    addLightToCart,
    getUserCart,
    getUserCartLights,
    removeLightFromUserCart
  };