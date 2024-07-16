const { userRouter } = require('../controllers/user');
const { catalogRouter } = require('../controllers/catalog');
const { commentsRouter } = require('../controllers/comments');

function configRoutes(app) {
  app.use('/users', userRouter);
  app.use('/data/catalog', catalogRouter);
  app.use('/comments', commentsRouter);
}

module.exports = { configRoutes };