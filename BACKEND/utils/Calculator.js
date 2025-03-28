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
    const availableEnergy = (solarPackageData.capacity * 5) / 1000 + solarPackageData.batteryStorage; // Convert capacity to kWh and add battery
    let remainingEnergy = availableEnergy;
    let supportedAppliances = [];

    // Sort appliances by power rating (smallest first)
    const prioritizedAppliances = [...commonAppliances].sort((a, b) => a.powerRating - b.powerRating);

    for (let appliance of prioritizedAppliances) {
        let dailyConsumption = (appliance.powerRating * appliance.usageHours) / 1000; // Convert to kWh

        // Check if appliance power rating is within inverter capacity
        if (appliance.powerRating <= solarPackageData.inverterCapacity * 1000) {
            // Calculate how many of this appliance we can support
            let maxCount = Math.floor(remainingEnergy / dailyConsumption);

            if (maxCount > 0) {
                supportedAppliances.push({
                    name: appliance.name,
                    powerRating: appliance.powerRating,
                    usageHours: appliance.usageHours,
                    count: maxCount
                });

                // Reduce the remaining energy
                remainingEnergy -= maxCount * dailyConsumption;
            }
        }
    }

    return supportedAppliances;
};

const totalEstimatedCost = (solarPackageData, calPanelCount) => {
    const panelCost = calPanelCount * solarPackageData.pricing.panelCostPerUnit
    const batteryCost = solarPackageData.batteryStorage * solarPackageData.pricing.batteryCostPerKWh
    const inverterCost = solarPackageData.pricing.inverterCostPerKW * solarPackageData.inverterCapacity
    const installationCost = solarPackageData.pricing.installationCost

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