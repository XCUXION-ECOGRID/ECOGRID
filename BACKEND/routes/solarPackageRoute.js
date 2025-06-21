const express = require('express')
const { createSolarPackageController, updateSolarPackageController, deletePackageController, getAllSolarPackageController } = require('../controllers/solarPackageController.js')

const router = express.Router()

/**
 * @swagger
 * /api/v1/solarpackage/create:
 *   post:
 *     summary: Create a new solar package
 *     tags: [SolarPackage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - capacity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the solar package
 *               description:
 *                 type: string
 *                 description: Details about the solar package
 *               capacity:
 *                 type: number
 *                 description: Power capacity in watts
 *               price:
 *                 type: number
 *                 description: Price of the solar package
 *     responses:
 *       200:
 *         description: Solar package created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/solarpackage:
 *   get:
 *     summary: Get all solar packages
 *     tags: [SolarPackage]
 *     responses:
 *       200:
 *         description: List of all solar packages
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/solarpackage/update/{id}:
 *   put:
 *     summary: Update a solar package
 *     tags: [SolarPackage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the solar package to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update in the solar package
 *     responses:
 *       200:
 *         description: Solar package updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/solarpackage/delete/{id}:
 *   delete:
 *     summary: Delete a solar package
 *     tags: [SolarPackage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the solar package to delete
 *     responses:
 *       200:
 *         description: Solar package deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


router.post('/create', createSolarPackageController)
router.get('/', getAllSolarPackageController)
router.put('/update/:id', updateSolarPackageController)
router.delete('/delete/:id', deletePackageController)

module.exports = router