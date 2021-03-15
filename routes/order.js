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
    const order = await OrderModel.deleteOne({ _id: req.params.vendorCode });
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