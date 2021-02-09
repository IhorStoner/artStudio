const { Router } = require('express');
const apiRouter = Router();
const picturesRouter = require('./pictures');
const imagesRouter = require('./images');

apiRouter.use('/pictures', picturesRouter);
apiRouter.use('/images', imagesRouter);

module.exports = apiRouter;