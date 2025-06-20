const express = require('express')
const router = express.Router()
const { createCompanyRepController } = require('../controllers/companyRepController')

router.post('/create.rep/:id', createCompanyRepController)

module.exports = router