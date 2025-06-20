const { createUser, verifyCode, loginUser, resendVerificationCode } = require("../service/authService")

async function createUserController(req, res) {
    try {
        const { name, email, password, phone, role } = req.body

        const result = await createUser({ name, email, password, phone, role })

        if (typeof result === "string") {
            return res.status(400).json({ message: result }) // User already exist
        }

        if (!result) {
            return res.status(500).json({ message: "Failed to create user" })
        }

        res.status(201).json({ message: "User created successfully", user: result })
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

async function resendVerificationCodeController(req, res) {
    const {email} = req.body;
    try {
        const result = await resendVerificationCode({email});

        if(typeof result === 'string'){
            return res.status(400).json({
                success: false,
                message: result
            })
        }
        
        if(!result){
            return res.status(500).json({
                success: false,
                message: 'Failed to resend verification code'
            })
        }

        return res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        console.log('Error caused by: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while resending verification code'
        })
    }
}

async function verifyCodeController(req, res) {
    const { email, code } = req.body

    try {
        const result = await verifyCode({ email, code })

        if (typeof result === "string") {
            return res.status(400).json({ message: result }) // User not found or already verified
        }

        if (!result) {
            return res.status(500).json({ message: "Failed to verify code" })
        }

        res.status(200).json({ message: "User verified successfully", user: result })
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

async function loginController(req, res) {
    const { email, password } = req.body
    try {
        const result = await loginUser({ email, password })
        if (typeof result === "string") {
            return res.status(400).json({ message: result }) // User not found or already verified
        }
        if (!result) {
            return res.status(500).json({ message: "Failed to login" })
        }
        res.status(200).json({ message: "User logged in successfully", user: result })
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

module.exports = {
    createUserController,
    resendVerificationCodeController,
    verifyCodeController,
    loginController,
}