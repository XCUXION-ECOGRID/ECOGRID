const express = require('express')
const { createUserController, verifyCodeController, loginController, resendVerificationCodeController } = require('../controllers/authController')
const router = express.Router()

router.use(express.json())

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and email verification
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 description: Optional role (e.g., admin, user)
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Failed to create user
 */

/**
 * @swagger
 * /api/v1/auth/resend-code:
 *   post:
 *     summary: Resend 4-digit verification code to user's email
 *     tags: [Auth]
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
 *                 format: email
 *     responses:
 *       200:
 *         description: Code resent successfully
 *       400:
 *         description: User not found or already verified
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/auth/verify:
 *   post:
 *     summary: Verify user's email with 4-digit code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               code:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 4
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid code or user already verified
 *       500:
 *         description: Verification failed
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a verified user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials or user not verified
 *       500:
 *         description: Server error
 */


router.post("/register", createUserController)
router.post("/resend-code", resendVerificationCodeController)
router.post("/verify", verifyCodeController)
router.post("/login", loginController)

module.exports = router