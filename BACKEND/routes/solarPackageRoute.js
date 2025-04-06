const express = require('express')
const { createSolarPackageController, updateSolarPackageController } = require('../controllers/solarPackageController.js')

const router = express.Router()

router.post('/create', createSolarPackageController)
router.put('/update/:id', updateSolarPackageController)

module.exports = router