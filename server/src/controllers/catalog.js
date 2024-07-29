const { Router } = require('express');
const validator = require('validator');

const {
  create,
  getLightById,
  getByOwnerId,
  getMarketplaceLights,
  update,
  deleteById,
  getUserCart,
  addLightToCart
} = require('../services/lights');
const { isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');

const catalogRouter = Router();

catalogRouter.get('/catalog/:id', async (req, res) => {

  if (req.params.id === 'noUser') {
    res.status(404).json({ code: 404, message: 'Access denied - no user logged in' });
    return;
  }

  const data = await getByOwnerId(req.params.id);

  res.json(data);
});

catalogRouter.get('/marketplace/:id', async (req, res) => {
  let userId = null;

  if (req.params.id !== 'noUser') {
    userId = req.params.id
  }

  const data = await getMarketplaceLights(userId);

  res.json(data);
});

catalogRouter.post(
  '/light',
  isUser(),
  body('name')
    .trim(),
  body('price')
    .trim(),
  body('date'),
  body('dimensions')
    .trim(),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await create(req.body, req.user._id);

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

catalogRouter.get('/light/:id', async (req, res) => {

  if(!validator.isMongoId(req.params.id)){
    res.send('invalid id ');
    return;
  }

  const record = await getLightById(req.params.id);

  if (!record) {
    res.status(404).json({ code: 404, message: 'Item not found' });
    return;
  }

  res.json(record);
});

catalogRouter.put(
  '/light/:id',
  isUser(),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await update(req.params.id, req.body, req.user._id);

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

catalogRouter.delete('/light/:id', isUser(), async (req, res) => {
  try {
    await deleteById(req.params.id, req.user._id);

    res.status(204).end();
  } catch (err) {
    if (err.message == 'Access denied') {
      res.status(403).json({ code: 403, message: 'Access denied' });
    } else if (err instanceof ReferenceError) {
      res.status(404).json({ code: 404, message: 'Item not found' });
    } else {
      res.status(400).json({ code: 400, message: parseError(err).message });
    }
  }
});

catalogRouter.get(
  '/cart/:userId',
  isUser(),
  async (req, res) => {
    const user = await getUserCart(req.params.userId);
    if (!user) {
      res.status(404).json({ code: 404, message: 'User Cart not found' });
      return;
    }
  
    res.json(user.cart);
  }
);

catalogRouter.put(
  '/cart/:lightId',
  isUser(),
  async (req, res) => {
    try {
      
      const lightId = req.params.lightId;
      const result = await addLightToCart(lightId, req.user._id);

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.message });
    }
  }
);

module.exports = {
  catalogRouter,
};
