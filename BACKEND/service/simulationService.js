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