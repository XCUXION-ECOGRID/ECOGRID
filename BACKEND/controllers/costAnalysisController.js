const { createCostAnalysis } = require("../service/costAnalysisService")

async function costAnalysisController(req, res) {
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

module.exports = { costAnalysisController }