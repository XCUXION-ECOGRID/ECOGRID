const User = require('../models/users.js')
const bcrypt = require('bcrypt')

async function getAllUsers() {
    try {
        const users = await User.find()
        if(!users || users.length === 0){
            return "No users found"
        }
        return users
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return "User not found"
        }
        console.log(`user ${user.email} found`)
        return user
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function updateUserByEmail(email, updateData) {
    try {
        if(!email){
            return "please ensure your email is provided"
        }
        //make sure updateData must be an object
        if(!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0){
            return 'fields to be updated must be non-empty'
        }
        
        //checking for an existing phone number
        if(updateData.phone){
            const existingUser = await User.findOne({
                phone: updateData.phone,
                email: {$ne: email} // exclude the email of the user updating the account
            });

            if (existingUser){
                return 'phone number is already in use by an existing user'
            }
        }
        
        //only update name, phone number 
        const allowedFields = ['name', 'phone'];
        const providedFields = Object.keys(updateData);
        const disallowedFields = providedFields.filter(field => !allowedFields.includes(field));

        if(disallowedFields.length > 0){
            return 'Only name and phone number can be updated'
        }

        // updateOne ensures that only the metadata (matchedCount, modifiedCount)
        const updatedUser = await User.updateOne({email},
            {$set: updateData},
            { runValidators: true} // ensure update does not violate schema rules for phone number
        )

        //verify update using .matchedCount and .modifiedCount because of updateOne 
        if(updatedUser.matchedCount === 0){
            return 'User not found '
        }
        if(updatedUser.modifiedCount === 0){
            return 'User data failed to be updated'
        }

        return updateData

        // const result = await User.updateOne({ email }, { $set: updateData })
        // console.log(`User ${email} updated`)
        // return result
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

async function deleteUserByEmail(email) {
    try {

        await User.deleteOne({ email })
        console.log(`User ${email} deleted`)
    } catch (error) {
        console.log(error.message)
    }
}

async function forgotPassword(email){
    try {
        const existingUser = await User.findOne({email});
        
        console.log(`user ${existingUser.email} `);
        return existingUser;
    } catch (error) {
        console.log("Error cause by: ", error);
    }
}

async function verifyForgotPasswordCode(email, forgotPasswordCode){
    try {
        const existingUser = await User.findOne({email}).select('+forgotPasswordCode +forgotPasswordCodeValidation ');
        return existingUser;
 
    } catch (error) {
        console.log("Error caused by: ", error);
    }
}

async function setNewPassword(email){
    try {
        const existingUser = await User.findOne({email}).select('+forgotPasswordCode +forgotPasswordCodeValidation ');
        return existingUser;
 
    } catch (error) {
        console.log("Error caused by: ", error);
    }
}

module.exports = { getAllUsers, getUserByEmail, deleteUserByEmail, updateUserByEmail, forgotPassword, verifyForgotPasswordCode, setNewPassword }