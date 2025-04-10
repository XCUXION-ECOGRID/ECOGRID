const express = require('express')
const { createUserController, verifyCodeController, loginController } = require('../controllers/authController')
const router = express.Router()

router.use(express.json())

router.post("/register", createUserController)
router.post("/verify", verifyCodeController)
router.post("/login", loginController)

module.exports = router