const { createCompanyRep } = require("../service/companyRepService.js")

async function createCompanyRepController(req, res) {
    const { id: companyRepId } = req.params

    try {
        const result = await createCompanyRep(companyRepId, req.body)

        if (result === "Failed to update user") {
            return res.status(400).json({ message: result })
        }

        res.status(200).json({ message: "User updated successfully", data: result })
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    createCompanyRepController
}