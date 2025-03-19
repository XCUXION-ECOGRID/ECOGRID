const mongoose = require('mongoose')

const auditSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    auditype: {
        type: String,
        enum: ['residential', 'commercial', 'industrial'],
        required: true
    },
    energyConsumption: {
        type: Number,
        required: true
    },
    appliances: [{
        name: String,
        powerRating: Number, // Power rating in watts
        usageHours: Number // Daily usage in hours
    }],
    estimatedCost: {
        type: Number, // Cost of energy consumption (based on local tariff)
    },
    carbonFootprint: {
        type: Number, // Carbon emissions in kg CO₂
    },
    recommendation: [String],
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },
    report: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Audit', auditSchema)