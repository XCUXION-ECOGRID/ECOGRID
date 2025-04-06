const express = require('express')
const { createSolarPackageController } = require('../controllers/solarPackageController.js')

const router = express.Router()

router.post('/create', createSolarPackageController)

module.exports = router