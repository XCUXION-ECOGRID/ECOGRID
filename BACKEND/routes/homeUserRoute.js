const express = require("express");
const { createhomeUserController } = require("../controllers/homeUserController");
const router = express.Router()

router.post('/create/:id', createhomeUserController)

module.exports = router