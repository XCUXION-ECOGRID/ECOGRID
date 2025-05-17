const express = require('express')
const { getAllUsersController, getUserByEmailController, deleteUserByEmailController, updateUserByEmailController, forgotPasswordController, verifyForgotPasswordCodeController, setNewPasswordController } = require('../controllers/userController')
const router = express.Router()

const { authMiddleware, isAdmin } = require('../middleware/auth')

router.get('/all', authMiddleware, isAdmin, getAllUsersController)
router.get('/', authMiddleware, isAdmin, getUserByEmailController)
router.delete('/delete', authMiddleware, isAdmin, deleteUserByEmailController)
router.put('/update', authMiddleware, isAdmin, updateUserByEmailController);
router.post('/forgot-password', forgotPasswordController);
router.post('/verify-code', verifyForgotPasswordCodeController);
router.post('/newPassword', setNewPasswordController)


module.exports = router