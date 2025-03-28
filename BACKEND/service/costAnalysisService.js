const CostAnalyis = require("../models/costAnalysis.js")

async function createCostAnalysis(userData) {
    try {
        const existingUserPackage = await CostAnalyis.findOne({ packageId: userData.packageId })

        if (existingUserPackage) {
            console.log(`Cost Analysis for ${userData.packageId} already exist`)
        }
    } catch (error) {
        console.log("Unable to create cost analysis")
    }
}