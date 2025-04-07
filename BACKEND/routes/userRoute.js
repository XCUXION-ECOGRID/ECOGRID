const express = require('express')
const { createUserController, getUserByEmailController, deleteUserByEmailController } = require('../controllers/userController')
const Router = express.Router()

Router.post('/register', createUserController)
Router.get('/', getUserByEmailController)
Router.delete('/', deleteUserByEmailController)

module.exports = Router