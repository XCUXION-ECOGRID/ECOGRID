const mongoose = require('mongoose')

const costAnalysisScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSolarPackage',
        required: true
    },
    panelCost: { type: Number },
    batteryCost: { type: Number },
    inverterCost: { type: Number },
    installationCost: { type: Number },
    totalCost: { type: Number },
})

module.exports = mongoose.model('CostAnalyis', costAnalysisScheme)