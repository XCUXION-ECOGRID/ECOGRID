const mongoose = require('mongoose')

const solarPackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true,
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
    estimatedCost: {
        type: Number,
        required: true
    },
    appliancesSupported: [{
        name: String,
        powerRating: Number // Watts per appliance //ai provided
    }],
    recommendationCriteria: {
        minEnergyConsumption: Number, // Minimum required energy consumption to recommend this package
        maxEnergyConsumption: Number  // Maximum consumption it can handle
    },
    pricing: { // Pricing added by the admin
        panelCostPerUnit: { type: Number, required: true },  // Cost per solar panel
        batteryCostPerKWh: { type: Number, required: true }, // Cost per kWh of battery storage
        inverterCostPerKW: { type: Number, required: true }, // Cost per kW of inverter
        installationCost: { type: Number, required: true }   // Fixed installation cost
    }
}, { timestamps: true })

module.exports = mongoose.model('SolarPackage', solarPackageSchema)