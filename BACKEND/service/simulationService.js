const solarPackage = require("../models/solarPackage");

async function getPricing() {
    try {
        const adminPricing = await solarPackage.findOne()
        if (!adminPricing) {
            console.log("Solar Package not found")
        }
        return adminPricing.pricing
    } catch (error) {
        console.log("Unable to get pricing", error.message)
    }
}

async function calCostCustomePackage(userPackage) {

    const pricing = await getPricing()

    const { capacity, batteryStorage, inverterCapacity, panelCount, panelPowerRating } = userPackage

    const panelCost = panelCount * pricing.panelCostPerUnit;
    const batteryCost = batteryStorage * pricing.batteryCostPerKWh;
    const inverterCost = inverterCapacity * pricing.inverterCostPerKW;
    const totalCost = panelCost + batteryCost + inverterCost + pricing.installationCost;

    return {
        totalCost,
        breakdown: { panelCost, batteryCost, inverterCost, installationCost: pricing.installationCost }
    }
}

async function estimateCustomCapacity(appliances, panelPowerRating) {

    let totalDailyConsumption = 0

    appliances.forEach(appliance => {
        totalDailyConsumption += (appliance.powerRating * appliance.userHours) / 1000
    });

    const solarPanelEfficiency = 0.2
    const sunshineHours = 5
    const DoA = 1
    const DoD = 0.8
    const powerFactor = 0.8

    const solarCapacity = ((totalDailyConsumption / solarPanelEfficiency) / sunshineHours).toFixed(2)
    const panelCount = Math.ceil(solarCapacity / panelPowerRating)
    const batteryStorage = ((totalDailyConsumption * DoA) / DoD).toFixed(2)
    const peakPowerUsage = appliances.reduce((total, appliance) => total + appliance.powerRating, 0)
    const inverterCapacity = (peakPowerUsage / (powerFactor * 1000)).toFixed(2)

    return { totalDailyConsumption, panelCount, batteryStorage, inverterCapacity }
}

