const { Router } = require('express');
const pictureRouter = Router();
require('express-async-errors')
const { PictureModel } = require('../models/PictureModel')

pictureRouter.get('/', async (req, res) => {
  const pictures = await PictureModel.find({});
  res.status(200).json(pictures)
})

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
  console.log("req:BODY :", req.body)
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

pictureRouter.post('/', async (req, res) => {
  const newPicture = new PictureModel(req.body);
  const { _id } = await newPicture.save();
  res.status(201).send(newPicture);
})

module.exports = pictureRouter;
