const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');

const { getNewest, createComment } = require('../services/comments');

const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
   const data = await getNewest();
   res.json(data);
  });

  commentsRouter.post(
    '/',
    async (req, res) => {
      try {
        const validation = validationResult(req);
  
        if (validation.errors.length) {
          throw validation.errors;
        }
  
        const result = await createComment(req.body);
  
        res.json(result);
      } catch (err) {
        const parsed = parseError(err);
        res.status(400).json({ code: 400, message: parsed.message });
      }
    }
  );

module.exports = { commentsRouter };