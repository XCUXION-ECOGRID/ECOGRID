const { connectDB, closeDB } = require("../config/db");
const { createSolarPackage, updateSolarPackage, deletePackage } = require("../service/solarPackageService.js")

const testPackage = {
    name: "6kW Solar Home System",
    capacity: 3000, // 6 kW system (higher capacity)
    batteryStorage: 5, // 10 kWh battery (larger storage for bigger system)
    inverterCapacity: 2, // 6 kVA inverter
    panelPowerRating: 200, // Each panel is 200W (lower rating, more panels needed)
    Pricing: {
        panelCostPerUnit: 200, // $200 per panel
        batteryCostPerKWh: 150, // $150 per kWh of battery
        inverterCostPerKW: 500, // $500 per kW of inverter
        installationCost: 400,
    }
};

async function testCreateSolarPackage() {
    try {
        await connectDB()

        await createSolarPackage(testPackage)

    } catch (error) {
        console.log(error.message)
    } finally {
        await closeDB()
    }

}

async function testUpdateSolarPackage() {
    try {
        await connectDB()

        await updateSolarPackage('67ddce5793910b7dfdcae3d0', testPackage)

    } catch (error) {
        console.log(error.message)
    } finally {
        await closeDB()
    }
}

async function testDeleteSolarPackage() {
    try {
        await connectDB()

        await deletePackage('67ddd0dfdd6d195013d4b56c')

    } catch (error) {
        console.log(error.message)
    } finally {
        await closeDB()
    }
}


//testCreateSolarPackage()
//testUpdateSolarPackage()
//testDeleteSolarPackage()