const { Router } = require('express');
const pictureRouter = Router();
require('express-async-errors')
const { PictureModel } = require('../models/PictureModel')

pictureRouter.get('/', async (req, res) => {
  const pictures = await PictureModel.find({});
  res.status(200).json(pictures)
})

pictureRouter.get('/trousers', async (req, res) => {
  const pictures = await PictureModel.find({ type: 'trousers' });
  res.status(200).json(pictures)
})

pictureRouter.get('/t-shirts', async (req, res) => {
  const pictures = await PictureModel.find({ type: 't-shirts' });
  res.status(200).json(pictures)
})
pictureRouter.get('/jackets', async (req, res) => {
  const pictures = await PictureModel.find({ type: 'jackets' });
  res.status(200).json(pictures)
})
pictureRouter.get('/jumpsuits', async (req, res) => {
  const pictures = await PictureModel.find({ type: 'jumpsuits' });
  res.status(200).json(pictures)
})
pictureRouter.get('/all/all', async (req, res) => {
  const pictures = await PictureModel.find({});
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


pictureRouter.delete('/:pictureId', async (req, res) => {
  console.log(req.data)
  const picture = await PictureModel.deleteOne({ _id: req.params.pictureId });
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