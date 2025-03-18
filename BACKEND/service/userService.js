const { default: mongoose } = require('mongoose')
const User = require('../models/users.js')
const bcrypt = require('bcrypt')
const { connectDB, closeDB } = require('../config/db.js')

async function createUser({ name, email, password, role }) {
    const saltround = 10
    try {

        const existingUser = await User.findOne({ email })

        if (existingUser) console.log("User already exist")

        const hashPassword = await bcrypt.hash(password, saltround)
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role: role || 'user'
        })

        return await newUser.save()

    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email })

        if (!user) {
            console.log("User not found")
        }

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