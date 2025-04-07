const User = require('../models/users.js')
const bcrypt = require('bcrypt')

async function createUser({ name, email, password, role }) {
    const saltround = 10
    try {

        const existingUser = await User.findOne({ email })

        if (existingUser) return "User already exist"

        const hashPassword = await bcrypt.hash(password, saltround)
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role: role || 'user'
        })

        const user = await newUser.save()
        console.log(`User ${name} created`)
        return user
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

async function deleteUserByEmail(email) {
    try {

        await User.deleteOne({ email })
        console.log(`User ${email} deleted`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { createUser, getUserByEmail, deleteUserByEmail }