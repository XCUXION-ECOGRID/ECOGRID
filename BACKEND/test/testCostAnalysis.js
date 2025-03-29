const { connectDB, closeDB } = require("../config/db")
const { createCostAnalysis } = require("../service/costAnalysisService.js")

const userData = {
    packageId: "67e6f922d5198f45e506363d",
    user: "67d9e305d7027ab8db6c9e1b",
    packageName: "Custom Solar Package 1",
}

async function testCreatCostAnalysis() {
    try {
        await connectDB()
        await createCostAnalysis(userData)

    } catch (error) {
        console.log(error.message)
    } finally {
        closeDB()
    }
}

testCreatCostAnalysis()