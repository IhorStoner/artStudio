const { Router } = require('express');
const pictureRouter = Router();
require('express-async-errors')
const { PictureModel } = require('../models/PictureModel')

pictureRouter.get('/types/:type', async (req, res) => {
  const pictures = await PictureModel.find({ type: req.params.type });
  res.status(200).json(pictures)
})


pictureRouter.get('/categories', async (req, res) => {
  const pictures = await PictureModel.distinct('type');
  res.status(200).json(pictures)
})

pictureRouter.get('/:pictureId', async (req, res) => {
  const picture = await PictureModel.find({ _id: req.params.pictureId });

  if (!picture) {
    res.status(400).send({ error: 'Picture not found' });
    return
  } else {
    res.status(200).send(picture);
  }
})

pictureRouter.put('/:pictureId', async (req, res) => {
  const picture = await PictureModel.findByIdAndUpdate(req.params.pictureId, req.body, { new: true });

  if (!picture) {
    res.status(400).send({ error: 'Picture not found' });
    return
  } else {
    res.status(200).send(picture);
  }
})


pictureRouter.delete('/:pictureId', async (req, res) => {
  const picture = await PictureModel.deleteOne({ _id: req.params.pictureId });
  if (!picture) {
    res.status(400).send({ error: 'Picture not found' });
    return
  } else {
    res.status(200).send(picture);
  }
})

pictureRouter.get('/pagination/:params', async (req, res) => {
  console.log(req.params.params)
  const page = req.query.page || 1;
  const pagesize = 1000;

  let result = []
  let pages = 'not found';
  const items = await PictureModel.aggregate([{ $skip: ((page || 1) - 1) * pagesize }, { $limit: pagesize }])


  if (items.length) {
    const countAds = await PictureModel.aggregate([{ $count: 'ads' }])
    pages = Math.ceil((Number(countAds[0].ads) / Number(pagesize)))
    result = items
    console.log('countAds ', countAds)
  }

  res.json([result, pages])
})

pictureRouter.post('/rename/', async (req, res) => {
  const { oldType, newType } = req.body
  const order = await PictureModel.update({ type: oldType }, { $set: { type: newType } });
  if (!order) {
    res.status(400).send({ error: 'Order not found' });
    return
  } else {
    res.status(200).send(order);
  }
})


pictureRouter.post('/', async (req, res) => {
  const newPicture = new PictureModel(req.body);
  const { _id } = await newPicture.save();
  res.status(201).send(newPicture);
})

module.exports = pictureRouter;
