const UserSolarPackage = require('../models/userSolarPackage.js')
const { estimateCustomCapacity } = require('./simulationService.js')

async function createUserCustomPackage(userData) {
    try {

        const existingUserPackage = await UserSolarPackage.findOne({ name: userData.name })

        if (existingUserPackage) {
            console.log("Package name already exist")
            return
        }

        const result = await estimateCustomCapacity(userData.appliance, userData.panelPowerRating)

        console.log(result)

        if (!result || isNaN(result.inverterCapacity) || isNaN(result.panelCount)) {
            console.log("Error in estimating capacity: Invalid calculation result")
            return
        }


        const newUserPackage = new UserSolarPackage({
            ...userData,
            inverterCapacity: result.inverterCapacity,
            panelCount: result.panelCount,
        })

        await newUserPackage.save()

        console.log(`User Package ${userData.name} saved successfully`)
    } catch (error) {
        console.log("Unable to create new Package", error.message)
    }
}

module.exports = { createUserCustomPackage }