const { createCostAnalysis, getAllCostAnalysis, getCostAnalysisById } = require("../service/costAnalysisService")

async function createAnalysisController(req, res) {
    try {

        const result = await createCostAnalysis(req.body)

        if (!result) {
            return res.status(404).json({ message: "Cost analysis not created" })
        }

        res.status(201).json({ message: "Cost analysis created successfully", data: result })
    } catch (error) {
        console.log("Unable to create cost analysis", error.message)
        res.status(500).json({ message: "Unable to create cost analysis" })
    }
}

async function getAllCostAnalysisController(req, res) {
    try {
        const result = await getAllCostAnalysis()

        if (!result) {
            return res.status(404).json({ message: "Cost analysis not found" })
        }

        return res.status(200).json({ message: "Cost analysis found", data: result })
    } catch (error) {
        console.log("Unable to get cost analysis", error.message)
        res.status(500).json({ message: "Unable to get cost analysis" })
    }
}

async function getCostAnalysisByIdController(req, res) {
    const { id: costAnalysisId } = req.params

    try {
        const result = await getCostAnalysisById(costAnalysisId)

        if (!result) {
            return res.status(404).json({ message: "Cost analysis not found" })
        }

        res.status(200).json({ message: "Cost analysis found", data: result })
    } catch (error) {

        res.status(500).json({ message: "Unable to get cost analysis", errorMessage: error.message })
    }
}

module.exports = { createAnalysisController, getAllCostAnalysisController, getCostAnalysisByIdController }