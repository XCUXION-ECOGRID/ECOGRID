const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: { // assuming solar package is the only product being sold
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SolarPackage',
        required: true,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 1
    },
    amountPaid: {
        type: Number,
        required: true,
        min: 0
    }
},{timestamps: true})

module.exports = mongoose.model('Order', orderSchema);

