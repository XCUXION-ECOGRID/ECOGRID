const mailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const sendEmail = async (to, code) => {
    const mailOptions = {
        from: `EcoGrid <${process.env.EMAIL_USERNAME}>`,
        to,
        subject: "Verify your email - EcoGrid",
        html: `
                <div>
                    <h2>Welcome to the Energy Audit App!</h2>
                    <p>Your verification code is:</p>
                    <h1>${code}</h1>
                    <p>This code is valid for 15 minutes. Please use it to verify your account.</p>
                </div>
                 `,
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to', to);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
}

module.exports = { sendEmail }