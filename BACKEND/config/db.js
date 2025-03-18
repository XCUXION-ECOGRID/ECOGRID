const mongoose = require('mongoose')
require('dotenv').config({ path: '../../.env' })

async function connectDB() {
    try {
        console.log("Connecting to Database")

        await mongoose.connect(process.env.MONGO_URI)

        const collections = await mongoose.connection.db.listCollections().toArray()

        console.log("Database Connection sucessful")

    } catch (error) {
        console.log("Error:", error.message)
    }
}

async function closeDB() {
    try {
        await mongoose.connection.close()
        console.log("DB closed")
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

module.exports = { connectDB, closeDB }