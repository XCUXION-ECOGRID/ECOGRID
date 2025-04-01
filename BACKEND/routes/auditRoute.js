const express = require('express')
const { createAuditController } = require('../controllers/auditController.js')

const router = express.Router()

router.post("/create", createAuditController)

module.exports = router