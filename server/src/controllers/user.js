const { login, register } = require('../services/user');
const { createToken } = require('../services/jwt');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');
const { isUser, isGuest } = require('../middlewares/guards');

const userRouter = Router();

userRouter.post('/login',
  isGuest(),
  body('email').trim(),
  body('password').trim(),
  async (req, res) => {
  try {
    const result = await login(req.body.email, req.body.password);
    
    const accessToken = createToken(result);
    res.json({
      userId: result._id,
      email: result.email,
      accessToken,
      userCart: result.cart
    });
  } catch (err) {
      res.status(403).json({ code: 403, message: 'Incorrect email or password' });
  }
});

userRouter.post('/register', 
  isGuest(),
  body('email').trim().isEmail().withMessage('Please enter valid email'),
  body('password').trim().isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
  async (req, res) => {
  try {
    const validation = validationResult(req);

    if (validation.errors.length) {
      throw validation.errors;
    }

    const result = await register(req.body.email, req.body.password);
    const accessToken = createToken(result);
    res.json({
      userId: result._id,
      email: result.email,
      accessToken,
      userCart: result.cart
    });
  
  } catch (err) {
      const parsed = parseError(err);
      console.log(parsed);
      res.status(403).json({ code: 403, message: parsed.message });
  }
});

userRouter.get('/logout', (req, res) => {
  res.status(204).end();
});

module.exports = { userRouter };
