const { Router } = require('express');

const {
  getAll,
  create,
  getById,
  getByOwnerId,
  getCustomersLights,
  getMarketplaceLights,
  update,
  deleteById,
} = require('../services/lights');
const { isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');

const catalogRouter = Router();

catalogRouter.get('/', async (req, res) => {
  let data;

  if (req.query.where) {
    const ownerId = req.query.where.match(/_ownerId="(.+?)"/)?.[1];

    if (ownerId) {
      data = await getByOwnerId(ownerId);
    }
  }

  res.json(data);
});

catalogRouter.get('/marketplace/:id', async (req, res) => {
  let userId = '';
  if (req.params.id != 'noUser') {
    userId = req.params.id;
  }
  const data = await getMarketplaceLights(userId);

  res.json(data);
});

catalogRouter.post(
  '/',
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

catalogRouter.get('/:id', async (req, res) => {
  const record = await getById(req.params.id);

  if (!record) {
    res.status(404).json({ code: 404, message: 'Item not found' });
    return;
  }
  res.json(record);
});

catalogRouter.put(
  '/:id',
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

catalogRouter.delete('/:id', isUser(), async (req, res) => {
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

module.exports = {
  catalogRouter,
};
