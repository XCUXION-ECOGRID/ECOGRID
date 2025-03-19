const Audit = require('../models/audit.js')
const mongoose = require('mongoose')

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

async function updateAudit(auditID, updateData) {

    if (!mongoose.Types.ObjectId.isValid(auditID)) {
        console.log("Invalid ObjectId format");
        return
    }

    const audit = await Audit.findById(auditID)

    if (!audit) {
        console.log(`Audit with ID ${auditID} not found`)
        return
    }

    //update only provided data
    Object.assign(audit, updateData)

    let totalConsumption = 0

    if (updateData.appliances && Array.isArray(updateData.appliances) && updateData.appliances.length > 0) {
        totalConsumption = updateData.appliances.reduce((total, appliance) => {
            let dailyComsumption = (appliance.powerRating * appliance.usageHours) / 1000

            return total + dailyComsumption
        }, 0)
    }

    audit.energyConsumption = totalConsumption
    audit.estimatedCost = totalConsumption * ELECTRICITY_TARIFF
    audit.carbonFootprint = totalConsumption * CARBON_EMISSION_FACTOR

    await audit.save()
    console.log(`Updates for ${auditID} saved successfully`)

}

async function deleteAudit(auditID) {
    try {
        if (!mongoose.Types.ObjectId.isValid(auditID)) {
            console.log("Invalid ObjectId format")
            return
        }

        await Audit.deleteOne({ _id: auditID })

        console.log(`Audit with ID ${auditID} deleted`)
    } catch (error) {
        console.log("Audit unsuccessfully deleted")
    }
}

module.exports = { createAudit, updateAudit, deleteAudit }