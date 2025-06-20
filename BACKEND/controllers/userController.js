const { hmacProcess } = require("../config/hmac");
const bcrypt = require('bcrypt');
const { sendEmail, sendForgotPasswordMail } = require("../config/mailer")
const { getAllUsers, getUserByEmail, deleteData, updateUserByEmail, forgotPassword,  verifyForgotPasswordCode, setNewPassword, getPersonalData,  } = require("../service/userService")
const generateForgotPasswordCode = require("../utils/forgotPasswordCode")


async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsers()
        res.status(200).json({ message: "Users fetched successfully", users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getUserByEmailController(req, res) {
    const { email } = req.body
    try {
        const user = await getUserByEmail(email)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User found", user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getPersonalDataController(req, res) {
    try {
        const result = await getPersonalData(req); // pass request to get personal data

        if (typeof result === 'string'){
            return res.status(404).json({message: result});
        }
        return res.status(200).json({data: result})
    } catch (error) {
        console.log('Error caused by: ', error);
        return res.status(500).json({message: 'Internal server error while retrieving personal data'});
    }
}

async function updateUserByEmailController(req, res) {
    const { email, updateData } = req.body

    try {
        const result = await updateUserByEmail(req, email, updateData)
        if (typeof result === 'string'){
            return res.status(400).json({message: result})
        }
        res.status(200).json({ message: "updated successfully", result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteDataController(req, res) {
    try {
        const result = await deleteData(req);

        if(typeof result === 'string'){
            return res.status(400).json({message: result})
        }
        return res.status(200).json({ message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function forgotPasswordController(req, res) {
    const {email} = req.body;
    try {
        const existingUser = await forgotPassword(email);
        if (!existingUser){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const forgotPasswordCode = generateForgotPasswordCode(6);

        let info = sendForgotPasswordMail(existingUser.email, forgotPasswordCode, existingUser.name);

        const responseInfo = (await info).response;

        if(responseInfo && responseInfo.includes('OK')){
            //hash the code sent
            const hashedCode = hmacProcess(forgotPasswordCode, process.env.HMAC_SECRET_CODE);
            existingUser.forgotPasswordCode = hashedCode;
            const TEN_MINS_IN_MS = 600000;
            existingUser.forgotPasswordCodeValidation = Date.now() + TEN_MINS_IN_MS;
            await existingUser.save();

            return res.status(200).json({
                success: true,
                message: 'A six character code has been sent to you mail'
            })
        }

    } catch (error) {
        console.log('Error caused by: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error occurred while sending forgot password code',
        })

    }
}

async function verifyForgotPasswordCodeController(req, res) {
    const {email, forgotPasswordCode} = req.body;
    try {
        const existingUser = await verifyForgotPasswordCode(email, forgotPasswordCode);

        if(!existingUser){
            return res.status(400).json({ success: false, message: "User not found"})
        }

        if(!existingUser.forgotPasswordCode && !existingUser.forgotPasswordCodeValidation){
            return res.status(400).json({success: false,message: "Forgot Password code has already been used"})
        }

        if(!existingUser.forgotPasswordCode || !existingUser.forgotPasswordCodeValidation){
            return res.status(400).json({success: false,message: "Forgot Password code is invalid"
            })  
        }

        if(Date.now() > existingUser.forgotPasswordCodeValidation){
            throw new Error ("Forgot Password code has expired")
        }

        const hashedCode = hmacProcess(forgotPasswordCode, process.env.HMAC_SECRET_CODE);

        if(hashedCode === existingUser.forgotPasswordCode){
            existingUser.forgotPasswordCode = undefined;
            existingUser.forgotPasswordCodeValidation = undefined;

            await existingUser.save();
            return res.status(200).json({success: true, message: 'Code is valid'
            })
        }

        return res.status(401).json({success: false,  message: 'Code is invalid, failed to update password'})
    } catch (error) {
        console.log('Error caused by: ', error);
        return res.status(500).json({
            success: false, 
            message: 'Internal server error while validating code'
        })
    }
}

async function setNewPasswordController(req, res) {
    const {email, newPassword} = req.body;
    try {
        if (!email){
            return res.status(400).json({
                success: false,
                message: 'Email must be provided'
            })
        }
        if(!newPassword || typeof newPassword !== 'string'){
            return res.status(400).json({
                success: false,
                message: 'Password field must be provided and should not be an empty string'
            })
        }
        const existingUser = await setNewPassword(email);
        if(!existingUser){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const password = await bcrypt.hash(newPassword, 10);
        existingUser.password = password;
        await existingUser.save();

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    } catch (error) {
        console.log('Error is caused by: :', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while setting new password'
        })
    }
}

module.exports = { 
    getAllUsersController, 
    getUserByEmailController, 
    deleteDataController, 
    updateUserByEmailController, 
    forgotPasswordController, 
    verifyForgotPasswordCodeController, 
    setNewPasswordController,
    getPersonalDataController
}