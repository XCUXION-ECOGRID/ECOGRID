const mongoose = require('mongoose')
const SolarPackage = require('../models/solarPackage.js')
const { totalEstimatedCost } = require('../utils/Calculator.js')

const checkValidID = (objectID) => {
    if (!mongoose.Types.ObjectId.isValid(objectID)) {
        console.log("Invalid Solar Package ID")
        return
    }
}

async function createSolarPackage(solarPackageData) {
    try {

        if (!solarPackageData.name) {
            console.log("Package name is required")
            return
        }

        const existingPackage = await SolarPackage.findOne({ name: solarPackageData.name })

        if (existingPackage) {
            console.log("This Package already exist")
            return
        }

        const calPanelCount = Math.ceil(solarPackageData.capacity / solarPackageData.panelPowerRating)

        const calEstimatedCost = totalEstimatedCost(solarPackageData, calPanelCount)
        //const supportedAppliances = applianceSupportCal(solarPackageData)

        const solarPackage = new SolarPackage(
            {
                ...solarPackageData,
                panelCount: calPanelCount,
                estimatedCost: calEstimatedCost,
                //appliancesSupported: supportedAppliances,
            }
        )
        await solarPackage.save()
        console.log(`${solarPackageData.name} is save`)
        return solarPackage
    } catch (error) {
        console.log("Solar Package was not created", error.message)
    }
}

async function updateSolarPackage(SolarPackageID, updateSolarPackageData) {
    try {
        checkValidID(SolarPackageID)

        const solarPackage = await SolarPackage.findById(SolarPackageID)

        if (!solarPackage) {
            console.log(`SolarPackage with ${SolarPackageID} not found`)
            return
        }

        Object.assign(solarPackage, updateSolarPackageData)

        const calPanelCount = Math.ceil(updateSolarPackageData.capacity / updateSolarPackageData.panelPowerRating)
        const calEstimatedCost = totalEstimatedCost(updateSolarPackageData, calPanelCount)
        //const supportedAppliances = applianceSupportCal(updateSolarPackageData)

        solarPackage.panelCount = calPanelCount
        solarPackage.estimatedCost = calEstimatedCost
        //solarPackage.appliancesSupported = supportedAppliances

        console.log(solarPackage)

        await solarPackage.save()
        console.log(`Solar Package ${solarPackage.name} updated`)

    } catch (error) {
        console.log(`Solar Package ${SolarPackageID} was not updated successfully`, error.message)
    }
}

async function deletePackage(solarPackageID) {
    try {
        checkValidID(solarPackageID)

        const result = await SolarPackage.findByIdAndDelete(solarPackageID)
        console.log(`Solar package ${result.name} deleted successfully`)
    } catch (error) {
        console.log(`Unable to delete Solar Package ${solarPackageID}`, error.message)
    }
}

module.exports = { createSolarPackage, updateSolarPackage, deletePackage }