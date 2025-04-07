const UserSolarPackage = require('../models/userSolarPackage.js')
const { estimateCustomCapacity } = require('./simulationService.js')

async function createUserCustomPackage(userData) {
    try {

        const existingUserPackage = await UserSolarPackage.findOne({ name: userData.name })

        if (existingUserPackage) {
            console.log("Package name already exist")
            return "Package name already exist"
        }

        const result = await estimateCustomCapacity(userData.appliance, userData.panelPowerRating)

        const newUserPackage = new UserSolarPackage({
            ...userData,
            inverterCapacity: result.inverterCapacity,
            panelCount: result.panelCount,
        })

        const newPackage = await newUserPackage.save()

        console.log(`User Package ${userData.name} saved successfully`)
        return newPackage
    } catch (error) {
        console.log("Unable to create new Package", error.message)
    }
}

async function updateUserCustomPackage(customePackageID, userData) {
    try {
        const customePackage = await UserSolarPackage.findById(customePackageID)
        if (!customePackage) {
            console.log(`No package found with ID: ${customePackageID}`)
            return
        }
        Object.assign(customePackage, userData)

        const result = await estimateCustomCapacity(userData.appliance, userData.panelPowerRating)

        customePackage.inverterCapacity = result.inverterCapacity
        customePackage.panelCount = result.panelCount

        const updatePackage = await customePackage.save()
        console.log(`User Package ${userData.name} updated successfully`)
        return updatePackage
    } catch (error) {
        console.log(`Unable to update User Package ${customePackageID}`, error.message)
    }
}

async function getAllUserCustomePackages() {
    try {
        const userPackagesDoc = await UserSolarPackage.find()
        if (!userPackagesDoc) {
            console.log("No user packages found")
            return
        }
        console.log("User Packages found")
        return userPackagesDoc
    } catch (error) {
        console.log("User packages not found", error.message)
    }
}

async function deleteUserCustomPackage(customePackageID) {
    try {
        const result = await UserSolarPackage.findByIdAndDelete(customePackageID)
        console.log(`User Package ${result.name} deleted successfully`)
        return result
    } catch (error) {
        console.log(`Unable to delete User Package ${customePackageID}`, error.message)
    }
}

module.exports = { createUserCustomPackage, updateUserCustomPackage, getAllUserCustomePackages, deleteUserCustomPackage }