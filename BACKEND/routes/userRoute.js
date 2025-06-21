const express = require('express')
const { getAllUsersController, getUserByEmailController, deleteDataController, updateUserByEmailController, forgotPasswordController, verifyForgotPasswordCodeController, setNewPasswordController, getPersonalDataController } = require('../controllers/userController')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and operations
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       403:
 *         description: Forbidden (not an admin)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user by email (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get personal user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete current user's data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user data by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               updateData:
 *                 type: object
 *                 example:
 *                   name: Updated Name
 *                   phone: "+233501234567"
 *     responses:
 *       200:
 *         description: User updated successfully
 */

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Send forgot password verification code
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Verification code sent
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/verify-code:
 *   post:
 *     summary: Verify forgot password code
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - forgotPasswordCode
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               forgotPasswordCode:
 *                 type: string
 *                 example: "A1B2C3"
 *     responses:
 *       200:
 *         description: Code is valid
 *       401:
 *         description: Code is invalid or expired
 */

/**
 * @swagger
 * /users/newPassword:
 *   post:
 *     summary: Set a new password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 example: MySecureP@ssw0rd!
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       404:
 *         description: User not found
 */


const { authMiddleware } = require('../middleware/auth')
const { isAdmin } = require('../middleware/adminAuth')

router.get('/all', authMiddleware, isAdmin, getAllUsersController)
router.get('/', authMiddleware, isAdmin, getUserByEmailController)
router.get('/me', authMiddleware, getPersonalDataController)
router.delete('/delete', authMiddleware, deleteDataController) // need to update this to make sure that it is accessible to both admin and user
router.put('/update', authMiddleware, updateUserByEmailController); // should be for both admin and a normal user
router.post('/forgot-password', forgotPasswordController);
router.post('/verify-code', verifyForgotPasswordCodeController);
router.post('/newPassword', setNewPasswordController)


module.exports = router