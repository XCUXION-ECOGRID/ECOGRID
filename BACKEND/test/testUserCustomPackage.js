const { connectDB, closeDB } = require("../config/db")
const { createUserCustomPackage } = require("../service/userSolarPackageService.js")

const userData = {
    user: "67d9e305d7027ab8db6c9e1b",
    name: "Custom Solar Package 1", // Unique package name for testing
    capacity: 5000,                // Custom capacity in watts
    batteryStorage: 10,            // Battery storage in kWh
    panelPowerRating: 300,         // Power rating of each panel in watts
    appliance: [
        { name: "Fridge", powerRating: 150, usageHours: 24 },
        { name: "TV", powerRating: 100, usageHours: 6 },
        { name: "Laptop", powerRating: 50, usageHours: 8 }
    ]
}

async function testCreateUserSolarPackage() {
    try {
        await connectDB()

        await createUserCustomPackage(userData)

    } catch (error) {
        console.log(error.message)
    } finally {
        await closeDB()
    }
}

testCreateUserSolarPackage()