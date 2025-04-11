const { getAllUsers, getUserByEmail, deleteUserByEmail, updateUserByEmail } = require("../service/userService")

async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsers()
        res.status(200).json({ message: "Users fetched successfully", users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getUserByEmailController(req, res) {
    const { email } = req.body
    try {
        const user = await getUserByEmail(email)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User found", user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateUserByEmailController(req, res) {
    const { email, updateData } = req.body

    try {
        const result = await updateUserByEmail(email, updateData)
        res.status(200).json({ message: "updated successfully", result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteUserByEmailController(req, res) {
    const { email } = req.body
    try {
        await deleteUserByEmail(email)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAllUsersController, getUserByEmailController, deleteUserByEmailController, updateUserByEmailController }