const { Router } = require('express');
const orderRouter = Router();
require('express-async-errors')
const { OrderModel } = require('../models/OrderModel');

orderRouter.get('/', async (req, res) => {
    const orders = await OrderModel.find({});
    res.status(200).json(orders)
})

orderRouter.get('/:orderNumber', async (req, res) => {
    const order = await OrderModel.find({ _id: req.params.vendorCode });
    if (!order) {
        res.status(400).send({ error: 'Picture not found' });
        return
    } else {
        res.status(200).send(order);
    }
})

orderRouter.delete('/:orderNumber', async (req, res) => {
    const order = await OrderModel.deleteOne({ orderNumber: req.params.orderNumber });
    if (!order) {
        res.status(400).send({ error: 'Order not found' });
        return
    } else {
        res.status(200).send(order);
    }
})

orderRouter.put('/:id', async (req, res) => {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) {
        res.status(400).send({ error: 'Order not found' });
        return
    } else {
        res.status(200).send(order);
    }
})

orderRouter.post('/', async (req, res) => {
    const newOrder = new OrderModel(req.body);
    const { _id } = await newOrder.save();
    res.status(201).send(newOrder);
})

module.exports = orderRouter;

// heroesRouter.put('/quest/:heroId', async (req, res) => {
//     const quests = req.body[0]
//     const completedQuests = req.body[1]
//     let hero;

//     if (!completedQuests) {
//       hero = await HeroModel.findByIdAndUpdate(req.params.heroId, { quests: quests }, { new: true })
//     } else {
//       hero = await HeroModel.findByIdAndUpdate(req.params.heroId, { quests: quests, completedQuests: completedQuests }, { new: true })
//     }

//     res.status(200).send(hero);
//   })