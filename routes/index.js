const { Router } = require('express');
const apiRouter = Router();
const picturesRouter = require('./pictures');
const imagesRouter = require('./images');
const adminRouter = require('./admin');
const orderRouter = require('./order');

apiRouter.use('/pictures', picturesRouter);
apiRouter.use('/images', imagesRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/order', orderRouter)

module.exports = apiRouter;