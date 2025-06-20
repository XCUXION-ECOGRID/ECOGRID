const mongoose = require('mongoose')


const homeUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SolarPackage',
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SolarPackage',
    }],
    customePackages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SolarPackage',
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
}, { timestamps: true })

module.exports = mongoose.model('HomeUser', homeUserSchema)