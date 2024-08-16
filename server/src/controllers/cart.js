const { Router } = require('express');

const { isUser } = require('../middlewares/guards');

const { parseError } = require('../util');
const {
  getUserCart,
  addLightToCart,
  getUserCartLights,
  removeLightFromUserCart,
} = require('../services/cart');

const cartRouter = Router();

cartRouter.get('/:userId', isUser(), async (req, res) => {
  if (req.params.userId === 'undefined') {
    return;
  }

  try {
    const user = await getUserCart(req.params.userId);
    res.json(user.cart);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

cartRouter.put('/:lightId', isUser(), async (req, res) => {
  try {
    const lightId = req.params.lightId;
    const result = await addLightToCart(lightId, req.user._id);

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

cartRouter.get('/lights/:lightsId', isUser(), async (req, res) => {
  try {
    const lightsId = req.params.lightsId;
    const ligthsIdArr = lightsId.split(',');
    const result = await getUserCartLights(ligthsIdArr);

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

cartRouter.delete('/:lightId', isUser(), async (req, res) => {
  try {
    const lightId = req.params.lightId;
    const result = await removeLightFromUserCart(lightId);

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { cartRouter };
