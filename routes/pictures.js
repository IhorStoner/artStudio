const { Router, request } = require('express');
const pictureRouter = Router();
require('express-async-errors')
const { PictureModel } = require('../models/PictureModel')
const UserSchema = require('../models/UserModel')
const fs = require("fs");
const path = require("path");


pictureRouter.get('/types/:type', async (req, res) => {
  const pictures = await PictureModel.find({ type: req.params.type });
  res.status(200).json(pictures)
})


pictureRouter.get('/categories', async (req, res) => {
  const picture = await PictureModel.distinct('type');
	const position = await UserSchema.findOne({login: 'admin'});

	position.orderCategory.sort((a,b) => a.pos - b.pos);
	position.orderCategory.forEach( el => {
		let index = picture.indexOf(el.name);
		let pos = el.pos -1
		if(index !== -1){
			let val = picture.splice(index,1)[0]
			picture.splice(pos,0,val)
		}
	})

  res.status(200).json(picture)
})

pictureRouter.put('/set/position/category', (req, res) => {
	try{
		UserSchema.findOne({login: 'admin'},function(err, adventure){
			UserSchema.findById(adventure._id,function (err, doc) {
				doc.orderCategory = req.body;
				doc.save()
				res.status(200).json(true)
			})
		})
	}catch(e){
		res.status(404).send(e.name)
	}

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
  const page = req.params.params ;
  const pagesize = 10;

  let result = []
  let pages = 'not found';
  const items = await PictureModel.aggregate([{ $skip: ((page || 1) - 1) * pagesize }, { $limit: pagesize }])

  if (items.length) {
    //получаем общее кол-во 
    const countAds = await PictureModel.aggregate([{ $count: 'ads' }])
    // определяем возможное кол-во страниц
    pages = Math.ceil((Number(countAds[0].ads) / Number(pagesize)))
    result = items
  }
  // result - актуальные соотв. странице, pages - кол-во страниц
  res.json([result, pages])
})

pictureRouter.post('/rename/', async (req, res) => {
  const { oldType, newType } = req.body
  const order = await PictureModel.updateMany({ type: req.body.oldType }, { $set: { type: req.body.newType } });
  if (!order) {
    res.status(400).send({ error: 'Order not found' });
    return
  } else {
    res.status(200).send(order);
  }
})

pictureRouter.put('/update/category', async (req, res) => {
  try{
    const {oldName, newType} = req.body;
    await PictureModel.updateMany({type: oldName},{type: newType});
    const user = await UserSchema.find();
    const types = await PictureModel.distinct('type');
    const newArr = await PictureModel.find();
    res.status(200).json({types, newArr});
  }catch(e){
    res.status(404).send(e.name);
  }
})

pictureRouter.get('/delete/category/:del', async (req, res) => {
  try{
		UserSchema.findOne({login: 'admin'},function(err, adventure){
			UserSchema.findById(adventure._id,function (err, doc) {
				const clone = [].concat(doc.orderCategory);
				const index = clone.findIndex( el => el.name === req.params.del)
				clone.splice(index,1)
				doc.orderCategory = clone;
				doc.save()
			})
		})
		await PictureModel.deleteMany({type: req.params.del})
		const types = await PictureModel.distinct('type');
    res.status(200).json(types);
  }catch(e){
     res.status(404).send(e.name);
  }
})

pictureRouter.post('/', async (req, res) => {
  const newPicture = new PictureModel(req.body);
  const { postionMenu, type } = req.body;
  const { _id } = await newPicture.save();
  res.status(201).send(newPicture);
})

pictureRouter.put('/delete/image', async (req, res) => {
  try{
    const {_id, file} = req.body;
    PictureModel.findById(_id,function (err, doc){
      const imageArr = doc.images;
      const fndIndex = imageArr.indexOf(file)

      if(file !== undefined && fndIndex !== -1){
        imageArr.splice(fndIndex,1);
        fs.unlink(path.resolve(__dirname, `path/to/uploadedFiles/${file}`), (err) => {
          if (err) {
            console.error(err)
            return
          }
        }) 
        doc.save();
      }
      res.status(200).json(doc)
    })

  }catch(e){
    res.status(404).send(e.name)
  }
})

module.exports = pictureRouter;
