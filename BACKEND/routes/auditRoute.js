const express = require('express')
const { createAuditController, updateAuditController, deleteAuditController } = require('../controllers/auditController.js')

const router = express.Router()

/**
 * @swagger
 * /api/v1/audit/create:
 *   post:
 *     summary: Create a new audit
 *     tags: [Audit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - appliances
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user
 *               appliances:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     wattage:
 *                       type: number
 *                     hours_per_day:
 *                       type: number
 *     responses:
 *       200:
 *         description: Create Audit successfully
 *       400:
 *         description: Missing user ID or appliances
 *       500:
 *         description: Failed to implement create audit controller
 */

/**
 * @swagger
 * /api/v1/audit/update/{id}:
 *   put:
 *     summary: Update an existing audit
 *     tags: [Audit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Audit ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update
 *     responses:
 *       200:
 *         description: Audit updated successfully
 *       400:
 *         description: Missing audit ID
 *       500:
 *         description: Failed to implement update audit controller
 */

/**
 * @swagger
 * /api/v1/audit/delete/{id}:
 *   delete:
 *     summary: Delete an audit
 *     tags: [Audit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Audit ID to delete
 *     responses:
 *       200:
 *         description: Audit deleted successfully
 *       400:
 *         description: Missing audit ID
 *       500:
 *         description: Failed to implement delete audit controller
 */


router.post("/create", createAuditController)
router.put("/update/:id", updateAuditController)
router.delete("/delete/:id", deleteAuditController)

module.exports = router