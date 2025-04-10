const mongoose = require('mongoose')

const verificationCodeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    expiryAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('VerificationCode', verificationCodeSchema)