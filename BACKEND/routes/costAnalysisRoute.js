const express = require('express')
const { costAnalysisController } = require('../controllers/costAnalysisController.js')
const router = express.Router()

router.post('/create', costAnalysisController)

module.exports = router