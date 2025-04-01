const express = require('express')
const { createAuditController, updateAuditController, deleteAuditController } = require('../controllers/auditController.js')

const router = express.Router()

router.post("/create", createAuditController)
router.put("/update/:id", updateAuditController)
router.delete("/delete/:id", deleteAuditController)

module.exports = router