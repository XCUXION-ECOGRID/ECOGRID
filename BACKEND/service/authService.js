const User = require('../models/users.js')
const VerificationCode = require('../models/verificationCode.js')
const bcrypt = require('bcrypt')
const { generateVerificationCode } = require('../utils/geneateCode.js')
const { sendEmail } = require('../config/mailer.js')
require('dotenv').config({ path: '../.env' })
const jwt = require('jsonwebtoken')

async function createUser({ name, email, password, phone, role }) {
    const saltround = 10
    try {

        const existingUser = await User.findOne({ email })

        if (existingUser) return "User already exist"

        const hashPassword = await bcrypt.hash(password, saltround)

        const verificationCode = generateVerificationCode()

        const codeExpiryAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

        const newUser = new User({
            name,
            email,
            phone,
            password: hashPassword,
            role: role || 'user',
            isVerified: false,
        })

        const user = await newUser.save()

        if (!user) return "Failed to create user"
        console.log(`User ${name} created`)

        const verificationCodeResult = await VerificationCode.create({
            user: user._id,
            code: verificationCode,
            expiryAt: codeExpiryAt,
        })

        if (!verificationCodeResult) return "Failed to create verification code"
        console.log(`Verification code ${verificationCode} created for user ${name}`)

        const sendEmailResult = await sendEmail(email, verificationCode, name)
        if (!sendEmailResult) return "Failed to send verification email"
        console.log("Verification code sent to email")

        return { message: "User created successfully", user, sendEmailResult }
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function verifyCode({ email, code }) {
    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return "User not found"

        if (existingUser.isVerified) return "User already verified"

        const verificationCode = await VerificationCode.findOne({
            user: existingUser._id,
            code,
        })

        if (!verificationCode) return "Invalid verification code"
        if (verificationCode.expiryAt < new Date()) return "Verification code expired"

        existingUser.isVerified = true
        await existingUser.save()

        await VerificationCode.deleteMany({ user: existingUser._id })

        const token = jwt.sign(
            { UserId: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        console.log(`User ${existingUser.name} verified`)

        return {
            message: "User verified successfully",
            token,
        }
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function loginUser({ email, password }) {
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) return `User with ${email} not found`

        if (!existingUser.isVerified) return "User not verified"

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return "Incorrect password"

        const token = jwt.sign(
            { UserId: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {
            message: "User logged in successfully",
            token,
        }
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

module.exports = { createUser, verifyCode, loginUser }