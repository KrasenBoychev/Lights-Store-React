const { Router } = require('express');

const { getNewest } = require('../services/comments');

const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
   const data = await getNewest();
   res.json(data);
  });

module.exports = { commentsRouter };