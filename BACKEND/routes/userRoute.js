const express = require('express')
const { getAllUsersController, getUserByEmailController, deleteUserByEmailController, updateUserByEmailController, forgotPasswordController, verifyForgotPasswordCodeController, setNewPasswordController } = require('../controllers/userController')
const router = express.Router()

const { authMiddleware, isAdmin } = require('../middleware/auth')

router.get('/all', authMiddleware, isAdmin, getAllUsersController)
router.get('/', authMiddleware, isAdmin, getUserByEmailController)
router.delete('/delete', authMiddleware, isAdmin, deleteUserByEmailController) // need to update this to make sure that it is accessible to both admin and user
router.put('/update', authMiddleware, isAdmin, updateUserByEmailController); // should be for both admin and a normal user
router.post('/forgot-password', forgotPasswordController);
router.post('/verify-code', verifyForgotPasswordCodeController);
router.post('/newPassword', setNewPasswordController)


module.exports = router