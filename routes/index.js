const { Router } = require('express');
const apiRouter = Router();
const picturesRouter = require('./pictures');
const imagesRouter = require('./images');
const adminRouter = require('./admin');

apiRouter.use('/pictures', picturesRouter);
apiRouter.use('/images', imagesRouter);
apiRouter.use('/admin', adminRouter)

module.exports = apiRouter;