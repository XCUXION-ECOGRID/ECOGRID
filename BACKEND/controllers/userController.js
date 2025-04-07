const { createUser, getUserByEmail, deleteUserByEmail } = require("../service/userService")

async function createUserController(req, res) {
    const { name, email, password, role } = req.body
    try {
        const user = await createUser({ name, email, password, role })
        if (!user) {
            return res.status(400).json({ message: "User not created" })
        }
        res.status(201).json({ message: "User created successfully", user })
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

async function deleteUserByEmailController(req, res) {
    const { email } = req.body
    try {
        await deleteUserByEmail(email)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createUserController, getUserByEmailController, deleteUserByEmailController }