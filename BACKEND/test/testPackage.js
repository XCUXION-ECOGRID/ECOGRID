const { connectDB, closeDB } = require("../config/db");
const { createSolarPackage } = require("../service/solarPackageService.js")

const testPackage = {
    name: "3kW Solar Home System",
    capacity: 3, // 3 kW
    batteryStorage: 5, // 5 kWh battery
    inverterCapacity: 3, // 3 kVA inverter
    panelPowerRating: 300, // Each panel is 300W
    Pricing: {
        panelCostPerUnit: 200, // $200 per panel
        batteryCostPerKWh: 150, // $150 per kWh of battery
        inverterCostPerKW: 500, // $500 per kW of inverter
        installationCost: 400
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

testCreateSolarPackage()