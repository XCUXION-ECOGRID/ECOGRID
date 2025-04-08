const mailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: `EcoGrid <${process.env.EMAIL_USERNAME}>`,
        to,
        subject,
        html,
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
}

module.exports = sendEmail