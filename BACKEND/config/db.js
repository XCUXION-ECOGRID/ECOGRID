const mongoose = require('mongoose')
require('dotenv').config({ path: '../../.env' })

async function connectDB() {
    try {
        console.log("Connecting to Database")
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)

        const collections = await mongoose.connection.db.listCollections().toArray()
        console.log(collections)

        console.log("Database Connection sucessful")

    } catch (error) {
        console.log("Error:", error.message)
    } finally {
        mongoose.connection.close()
        console.log("DB closed")
    }
}

module.exports = { connectDB }