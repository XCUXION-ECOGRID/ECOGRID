const crypto = require('crypto');

function generateForgotPasswordCode(length = 6){
    try {
        const bytelength = Math.ceil(length/2);
        const byte = crypto.randomBytes(bytelength);
        return byte.toString('hex').slice(0,length);
    } catch (error) {
        console.log('Error caused by ', error);
    }
}

module.exports = generateForgotPasswordCode;