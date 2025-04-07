const express = require('express')
const { createAnalysisController, getAllCostAnalysisController, getCostAnalysisByIdController } = require('../controllers/costAnalysisController.js')
const router = express.Router()

router.post('/create', createAnalysisController)
router.get('/', getAllCostAnalysisController)
router.get('/:id', getCostAnalysisByIdController)

module.exports = router