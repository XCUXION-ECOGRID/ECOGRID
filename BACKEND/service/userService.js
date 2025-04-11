const User = require('../models/users.js')
const bcrypt = require('bcrypt')

async function getAllUsers() {
    try {
        const users = await User.find()
        return users
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return "User not found"
        }
        console.log(`user ${user.email} found`)
        return user
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function updateUserByEmail(email, updateData) {
    try {
        const result = await User.updateOne({ email }, { $set: updateData })
        console.log(`User ${email} updated`)
        return result
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function deleteUserByEmail(email) {
    try {

        await User.deleteOne({ email })
        console.log(`User ${email} deleted`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { getAllUsers, getUserByEmail, deleteUserByEmail, updateUserByEmail }