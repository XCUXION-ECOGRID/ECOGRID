const Audit = require('../models/audit.js')
const mongoose = require('mongoose')
const { totalConsumption } = require('../utils/Calculator.js')

const ELECTRICITY_TARIFF = 0.12; // $ per kWh (Change based on location)
const CARBON_EMISSION_FACTOR = 0.92; // kg CO₂ per kWh (Average global value)

async function createAudit(auditData) {
    //console.log(auditData)
    try {
        if (!auditData.user) {
            console.log("User id required")
            return
        }

        // Calculation of Consumption, Cost and Carbon foot print
        const caltotalConsumption = totalConsumption(auditData)

        const estimatedCost = caltotalConsumption * ELECTRICITY_TARIFF

        const carbonFootprint = caltotalConsumption * CARBON_EMISSION_FACTOR

        const audit = new Audit({
            ...auditData,
            energyConsumption: caltotalConsumption,
            estimatedCost,
            carbonFootprint
        })

        const result = await audit.save()
        return result
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
    const caltotalConsumption = totalConsumption(updateData)

    //update only provided data
    Object.assign(audit, updateData)

    audit.energyConsumption = caltotalConsumption
    audit.estimatedCost = caltotalConsumption * ELECTRICITY_TARIFF
    audit.carbonFootprint = caltotalConsumption * CARBON_EMISSION_FACTOR

    const result = await audit.save()
    console.log(`Updates for ${auditID} saved successfully`)
    return result

}

async function deleteAudit(auditID) {
    try {
        if (!mongoose.Types.ObjectId.isValid(auditID)) {
            console.log("Invalid ObjectId format")
            return
        }

        const result = await Audit.deleteOne({ _id: auditID })
        console.log(`Audit with ID ${auditID} deleted`)
        return result
    } catch (error) {
        console.log("Audit unsuccessfully deleted")
    }
}

module.exports = { createAudit, updateAudit, deleteAudit }