const mongoose = require('mongoose')
const SolarPackage = require('../models/solarPackage.js')
const { applianceSupportCal, totalEstimatedCost } = require('../utils/Calculator.js')

async function createSolarPackage(solarPackageData) {
    try {

        if (!solarPackageData.name) {
            console.log("Package name is required")
            return
        }

        solarPackageData.name

        const calPanelCount = Math.ceil(solarPackageData.capacity / solarPackageData.panelPowerRating)

        const calEstimatedCost = totalEstimatedCost(solarPackageData, calPanelCount)
        const supportedAppliances = applianceSupportCal(solarPackageData)

        const solarPackage = new SolarPackage(
            {
                ...solarPackageData,
                panelCount: calPanelCount,
                estimatedCost: calEstimatedCost,
                appliancesSupported: supportedAppliances,
            }
        )
        await solarPackage.save()
        console.log(`${solarPackageData.name} is save`)
        return solarPackage
    } catch (error) {
        console.log("Solar Package was not created", error.message)
    }
}

module.exports = { createSolarPackage }