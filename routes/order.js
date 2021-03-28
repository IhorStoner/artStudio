const { Router } = require('express');
const orderRouter = Router();
require('express-async-errors')
const { OrderModel } = require('../models/OrderModel');
const nodemailer = require("nodemailer");

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

orderRouter.post('/rename/', async (req, res) => {
    const { oldType, newType } = req.body
    const order = await OrderModel.updateMany({ type: oldType }, { type: newType });
    if (!order) {
        res.status(400).send({ error: 'Order not found' });
        return
    } else {
        res.status(200).send(order);
    }
})

orderRouter.post('/', async (req, res) => {
		const {client, orderNumber, clothes, price} = req.body
		const {initials, phone, city, email} = client
    const newOrder = new OrderModel(req.body);
    const { _id } = await newOrder.save();

		let transporter = nodemailer.createTransport({
			service: "gmail",
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'info.xlia.vip@gmail.com', 
				pass: 'zaKFBtwcTx0o',
			},
		});


		transporter.sendMail({
			from: 'info.xlia.vip@gmail.com',
			to: email,
			subject: "Новый заказ",
			text: `Name: ${initials} Phone: ${phone}`,
			html: `
			<h2>Имя: ${initials}</h2>
			<h3>Номер заказа: ${Date.now()}</h3>
			<a href="tel:${initials}">Телефон: ${initials} </a>
			<h3>Адрес: ${city}</h3>
			<h2>
				Сумма: ${price}грн
			</h2>
			`
		});

    res.status(201).send(newOrder);
})

module.exports = orderRouter;
