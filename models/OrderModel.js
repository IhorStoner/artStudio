const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    text: {
        type: String,
    },
    price: {
        type: Number,
    },
    clothes: {
        type: Array,
    },
    orderNumber: {
        type: Number
    },
    status: {
        type: String
    }
});

module.exports = {
    OrderModel: mongoose.model('order', OrderSchema)
};