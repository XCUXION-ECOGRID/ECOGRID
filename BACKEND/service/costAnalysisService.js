const CostAnalysis = require("../models/costAnalysis.js")
const UserSolarPackage = require("../models/userSolarPackage.js")
const { calCostCustomePackage } = require("../service/simulationService.js")

async function createCostAnalysis(userData) {
    try {
        console.log("USER DATA", userData)

        const existingUserPackage = await CostAnalysis.findOne({ packageId: userData.packageId })

        if (existingUserPackage) {
            console.log(`Cost Analysis for ${userData.packageId} already exist`)
            return
        }

        //user must save an existing package before he can save the cost
        const userPackage = await UserSolarPackage.findOne({ user: userData.user, name: userData.packageName })

        if (!userPackage) {
            console.log(`UserPackage ${userData.packageName} does not exist`)
            return
        }

        const result = await calCostCustomePackage(userPackage)
        console.log(result)
        const { totalCost, panelCost, batteryCost, inverterCost, installationCost } = result

        const newCostAnalysis = new CostAnalysis({
            ...userData,
            panelCost,
            batteryCost,
            inverterCost,
            installationCost,
            totalCost,
        })

        const costAnalysisDoc = await newCostAnalysis.save()
        console.log(`Cost analysis for ${userPackage.name} saved successfully`)
        return costAnalysisDoc
    } catch (error) {
        console.log("Unable to create cost analysis", error.message)
    }
}

async function getAllCostAnalysis() {
    try {
        const costAnalysisDoc = await CostAnalysis.find()
        if (!costAnalysisDoc) {
            console.log("No cost analysis found")
            return
        }
        console.log("Cost analysis found")
        return costAnalysisDoc
    } catch (error) {
        console.log("Cost analysis not found", error.message)
    }
}

async function getCostAnalysisById(packageId) {
    try {
        const costAnalysis = await CostAnalysis.findById({ packageId: packageId })
        if (!costAnalysis) {
            console.log("Cost analysis not found")
            return
        }
        console.log("Cost analysis found")
        return costAnalysis
    } catch (error) {
        console.log("Cost analysis not found", error.message)
    }
}

module.exports = { createCostAnalysis, getAllCostAnalysis, getCostAnalysisById }