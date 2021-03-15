const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    comment: {
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
    },
    client: {
        type: Object
    }
});

module.exports = {
    OrderModel: mongoose.model('order', OrderSchema)
};