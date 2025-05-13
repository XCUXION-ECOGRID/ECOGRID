const HomeUserService = require("../service/houseUserService.js")

async function createhomeUserController(req, res) {
    try {
        const result = HomeUserService.houseUserService(req.params.houserUserId, req.body)

        if (result === "Failed to update home user") {
            return res.status(400).json({ message: result })
        }

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
    createhomeUserController
}