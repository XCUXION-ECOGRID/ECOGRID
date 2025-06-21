const express = require('express')
const { createAnalysisController, getAllCostAnalysisController, getCostAnalysisByIdController } = require('../controllers/costAnalysisController.js')
const router = express.Router()

/**
 * @swagger
 * /api/v1/cost-analysis/create:
 *   post:
 *     summary: Create a new cost analysis entry
 *     tags: [CostAnalysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - audit
 *               - totalCost
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user
 *               audit:
 *                 type: string
 *                 description: ID of the audit associated with the cost analysis
 *               totalCost:
 *                 type: number
 *                 description: Total calculated cost for solar installation
 *               notes:
 *                 type: string
 *                 description: Optional notes or details about the cost analysis
 *     responses:
 *       200:
 *         description: Cost analysis created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/cost-analysis:
 *   get:
 *     summary: Retrieve all cost analysis records
 *     tags: [CostAnalysis]
 *     responses:
 *       200:
 *         description: List of all cost analysis entries
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/cost-analysis/{id}:
 *   get:
 *     summary: Retrieve a specific cost analysis by ID
 *     tags: [CostAnalysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cost analysis to retrieve
 *     responses:
 *       200:
 *         description: Cost analysis data retrieved successfully
 *       404:
 *         description: Cost analysis not found
 *       500:
 *         description: Internal server error
 */


router.post('/create', createAnalysisController)
router.get('/', getAllCostAnalysisController)
router.get('/:id', getCostAnalysisByIdController)

module.exports = router