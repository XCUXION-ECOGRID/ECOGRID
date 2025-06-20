const express = require('express')
const { getAllUsersController, getUserByEmailController, deleteDataController, updateUserByEmailController, forgotPasswordController, verifyForgotPasswordCodeController, setNewPasswordController, getPersonalDataController } = require('../controllers/userController')
const router = express.Router()

const { authMiddleware} = require('../middleware/auth')
const {  isAdmin } = require('../middleware/adminAuth')

router.get('/all', authMiddleware, isAdmin, getAllUsersController)
router.get('/', authMiddleware, isAdmin, getUserByEmailController)
router.get('/me', authMiddleware, getPersonalDataController)
router.delete('/delete', authMiddleware,  deleteDataController) // need to update this to make sure that it is accessible to both admin and user
router.put('/update', authMiddleware,  updateUserByEmailController); // should be for both admin and a normal user
router.post('/forgot-password', forgotPasswordController);
router.post('/verify-code', verifyForgotPasswordCodeController);
router.post('/newPassword', setNewPasswordController)


module.exports = router