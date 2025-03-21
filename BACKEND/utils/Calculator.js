const commonAppliances = [
    { name: "LED Bulb", powerRating: 10, usageHours: 6 },
    { name: "Ceiling Fan", powerRating: 75, usageHours: 8 },
    { name: "Laptop", powerRating: 100, usageHours: 4 },
    { name: "TV", powerRating: 150, usageHours: 5 },
    { name: "Refrigerator", powerRating: 200, usageHours: 24 },
    { name: "Iron", powerRating: 1000, usageHours: 1 },
    { name: "Water Pump", powerRating: 1500, usageHours: 1 }
];

const applianceSupportCal = (solarPackageData) => {
    const availableEnergy = (solarPackageData.capacity * 5) + solarPackageData.batteryStorage  // kWh (Assuming 5 peak sun hours)
    let remainingEnergy = availableEnergy
    let supportedAppliances = []

    const prioritizedAppliances = commonAppliances.slice().sort((a, b) => a.powerRating - b.powerRating);

    for (let appliance of prioritizedAppliances) {
        let dailyConsumption = (appliance.powerRating * appliance.usageHours) / 1000 // Convert to kWh

        if (dailyConsumption <= remainingEnergy && appliance.powerRating <= solarPackageData.inverterCapacity * 1000) {
            let maxCount = Math.floor(remainingEnergy / dailyConsumption)

            if (maxCount > 0) {
                supportedAppliances.push({ ...appliance, count: maxCount })
                remainingEnergy -= maxCount * dailyConsumption
            }
        }
    }

    return supportedAppliances
}

const totalEstimatedCost = (solarPackageData, calPanelCount) => {
    const panelCost = calPanelCount * solarPackageData.Pricing.panelCostPerUnit
    const batteryCost = solarPackageData.batteryStorage * solarPackageData.Pricing.batteryCostPerKWh
    const inverterCost = solarPackageData.Pricing.inverterCostPerKW * solarPackageData.inverterCapacity
    const installationCost = solarPackageData.Pricing.installationCost

    return panelCost + batteryCost + inverterCost + installationCost

}

function totalConsumption(auditData) {
    let totalConsumption = 0

    if (auditData.appliances && auditData.appliances.length > 0) {

        totalConsumption = auditData.appliances.reduce((total, appliance) => {
            let dailyComsumption = (appliance.powerRating * appliance.usageHours) / 1000
            return total + dailyComsumption
        }, 0)
    }

    return totalConsumption
}

module.exports = { applianceSupportCal, totalEstimatedCost, totalConsumption }