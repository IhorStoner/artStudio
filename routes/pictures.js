const { Router } = require('express');
const pictureRouter = Router();
require('express-async-errors')
const { PictureModel } = require('../models/PictureModel')

pictureRouter.get('/', async (req, res) => {
  const pictures = await PictureModel.find({});
  res.status(200).json(pictures)
})

pictureRouter.get('/acrylic', async (req, res) => {
  const pictures = await PictureModel.find({ type: 'acrylic' });
  res.status(200).json(pictures)
})

pictureRouter.get('/oil', async (req, res) => {
  const pictures = await PictureModel.find({ type: 'oil' });
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

pictureRouter.post('/', async (req, res) => {
  const newPicture = new PictureModel(req.body);
  const { _id } = await newPicture.save();
  res.status(201).send(newPicture);
})

module.exports = pictureRouter;