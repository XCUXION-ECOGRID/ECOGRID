const { createAudit, updateAudit, deleteAudit } = require('../service/auditService.js')

async function createAuditController(req, res) {
    try {
        const { user, appliances } = req.body
        if (!user || appliances.length === 0) {
            return res.status(400).json({ message: "User ID and appliances required" })
        }

        const result = await createAudit(req.body)
        //console.log(result)

        if (!result) {
            console.log("Create Controller, Failed to save audit")
            return
        }

        res.status(200).json({ message: "Create Audit successfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to implement create audit controller", errorMesaage: error.message })
    }
}

async function updateAuditController(req, res) {
    try {
        const { id: auditID } = req.params

        if (!auditID) {
            console.log("Audit ID required")
            return
        }

        const result = await updateAudit(auditID, req.body)

        if (!result) {
            console.log("Update Controller, Failed to update audit")
            return
        }

        res.status(200).json({ message: `Audit ${auditID} updated sucessully` })

    } catch (error) {
        res.status(500).json({ message: "Failed to implement update audit controller", errorMesaage: error.message })
    }
}

async function deleteAuditController(req, res) {
    try {
        const { id: auditID } = req.params

        if (!auditID) {
            console.log("Audit ID required")
            return
        }

        const result = await deleteAudit(auditID)
        if (!result) {
            console.log("Delete Controller, Failed to delete audit")
            return
        }

        res.status(200).json({ message: `Audit ${auditID} deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: "Failed to implement delete audit controller", errorMesaage: error.message })
    }
}

module.exports = { createAuditController, updateAuditController, deleteAuditController }