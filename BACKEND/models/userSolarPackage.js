const mongoose = require('mongoose')

const userSolarPackageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,

    },
    capacity: { //simulate
        type: Number,
        required: true
    },
    batteryStorage: {
        type: Number, // kWh battery capacity
        required: true
    },
    inverterCapacity: {
        type: Number, // kVA inverter rating
        required: true
    },
    panelCount: {
        type: Number,
        required: true
    },
    panelPowerRating: {
        type: Number,
        required: true,
    },
    appliancesSupported: [{
        name: String,
        powerRating: Number // Watts per appliance //ai provided
    }],
}, { timestamps: true })

module.exports = mongoose.model('UserSolarPackage', userSolarPackageSchema)
