const Audit = require('../models/audit.js')


const ELECTRICITY_TARIFF = 0.12; // $ per kWh (Change based on location)
const CARBON_EMISSION_FACTOR = 0.92; // kg CO₂ per kWh (Average global value)


async function createAudit(auditData) {
    try {
        if (!auditData.user) {
            console.log("User id required")
            return
        }

        // Calculation of Consumption, Cost and Carbon foot print
        let totalConsumption = 0

        if (auditData.appliances && auditData.appliances.length > 0) {

            totalConsumption = auditData.appliances.reduce((total, appliance) => {
                let dailyComsumption = (appliance.powerRating * appliance.usageHours) / 1000
                return total + dailyComsumption
            }, 0)
        }

        const estimatedCost = totalConsumption * ELECTRICITY_TARIFF

        const carbonFootprint = totalConsumption * CARBON_EMISSION_FACTOR

        const audit = new Audit({
            ...auditData,
            energyConsumption: totalConsumption,
            estimatedCost,
            carbonFootprint
        })

        await audit.save()
        return audit
    } catch (error) {
        console.log("Error in creating Audit", error.message)
    }
}

module.exports = { createAudit }