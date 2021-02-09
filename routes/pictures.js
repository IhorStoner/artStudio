const { Router } = require('express');
const pictureRouter = Router();
require('express-async-errors')
const { PictureModel } = require('../models/PictureModel')

pictureRouter.get('/',async (req,res) => {
  const pictures = await PictureModel.find({});
  res.status(200).json(pictures)
})

pictureRouter.post('/', async (req, res) => {
  const newPicture = new PictureModel(req.body);
  const { _id } = await newPicture.save();
  res.status(201).send(newPicture);
})

module.exports = pictureRouter;