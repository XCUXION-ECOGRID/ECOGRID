const mongoose = require('mongoose')
const Users = require('./users')

const homeUserSchema = new mongoose.Schema({
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

module.exports = Users.discriminator('HomeUser', homeUserSchema)