const { createSolarPackage } = require("../service/solarPackageService")

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
                message: "Unable to implement solar package controller",
                errorMessage: error.message
            })
    }
}



module.exports = { createSolarPackageController }