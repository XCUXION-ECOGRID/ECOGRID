const express = require('express')
const { createSolarPackageController, updateSolarPackageController, deletePackageController, getAllSolarPackageController } = require('../controllers/solarPackageController.js')

const router = express.Router()

router.post('/create', createSolarPackageController)
router.get('/', getAllSolarPackageController)
router.put('/update/:id', updateSolarPackageController)
router.delete('/delete/:id', deletePackageController)

module.exports = router