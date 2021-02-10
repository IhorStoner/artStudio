const { Router } = require('express');
const UserModel = require('../models/UserModel');

const adminRouter = Router();

adminRouter.post('/', async (req,res) => {
  const { login, password } = req.body;

  const user = await UserModel.findOne({ login }, '+password')
  if(!user){
    return res.status(401).send({error: 'User is not found'})
  }

  const token = await user.auth(password)

  if(token) {
    res.status(200).send({id: user.id, token})
  } else {
    res.status(401).send({error: 'Password is not correct'})
  }
})

module.exports = adminRouter;