const { createSolarPackage, updateSolarPackage, deletePackage } = require("../service/solarPackageService")

async function createSolarPackageController(req, res) {
    try {
        const result = await createSolarPackage(req.body)

        if (!result) {
            console.log("Failed to saved solar package")
            res.status(500).json({ message: "Failed to saved solar package" })
            return
        }

        res.status(200).json({ message: "Solar package created successfully" })
    } catch (error) {
        console.error("Error in createSolarPackageController:", error.message)

        res.status(500).json(
            {
                message: "Unable to create solar package controller",
                errorMessage: error.message
            })
    }
}

async function updateSolarPackageController(req, res) {
    try {
        const { id: solarPackageID } = req.params

        const result = await updateSolarPackage(solarPackageID, req.body)

        if (!result) {
            console.log("Failed to update solar package")
            res.status(500).json({ message: "Failed to update solar package" })
            return
        }

        res.status(200).json({ message: "Solar package updated successfully" })
    } catch (error) {
        console.error("Error in updateSolarPackageController:", error.message)

        res.status(500).json(
            {
                message: "Unable to update solar package controller",
                errorMessage: error.message
            })
    }
}


async function deletePackageController(req, res) {
    try {
        const { id: solarPackageID } = req.params
        const result = await deletePackage(solarPackageID)

        if (!result) {
            console.log("Failed to delete solar package")
            res.status(500).json({ message: "Failed to delete solar package" })
            return
        }

        res.status(200).json({ message: `Solar package ${result.name} deleted successfully` })
    } catch (error) {
        console.error("Error in deleteSolarPackageController:", error.message)

        res.status(500).json(
            {
                message: "Unable to delete solar package in controller",
                errorMessage: error.message
            })
    }
}


module.exports = { createSolarPackageController, updateSolarPackageController, deletePackageController }