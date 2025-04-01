const { createAudit, updateAudit } = require('../service/auditService.js')

async function createAuditController(req, res) {
    try {
        const { user, appliances } = req.body
        if (!user || appliances.length === 0) {
            return res.status(400).json({ message: "User ID and appliances required" })
        }

        const result = await createAudit(req.body)
        //console.log(result)

        if (!result) {
            return res.status(500).json({ message: "Create Controller, Failed to save audit" })
        }

        res.status(200).json({ message: "Create Audit successfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to implement create audit controller" })
    }
}

async function updateAuditController(req, res) {
    try {
        const { auditID } = req.params

        if (!auditID) {
            return res.status(500).json({ message: "Audit ID required" })
        }

        const result = await updateAudit(auditID, req.body)

        if (!result) {
            return res.status(500).json({ message: "Update Controller, Failed to save audit" })
        }

        res.status(200).json({ message: `Audit ${auditID} updated sucessully` })

    } catch (error) {

    }
}

module.exports = { createAuditController }