const mailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "465"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    // Disable DNS lookups to avoid the error
    ignoreTLS: process.env.NODE_ENV === "development",
    // For Gmail specifically, you can use direct configuration
    // This helps avoid DNS lookups in some environments
    tls: {
        rejectUnauthorized: false,
    },
})

const generateEmailTemplate = (name, code) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7f7f7;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
          <tr>
            <td>
              <table align="center" width="100%" max-width="600px" style="background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                   <td> h1 style="font-size: 24px; font-weight: bold; color: #333;">
                      EcoGrid Energy Audit App
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 22px; font-weight: bold; color: #333;">
                    Verification Code
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0; font-size: 16px; color: #555;">
                    Hi <strong>${name}</strong>,<br><br>
                    Your verification code is:
                    <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #111;">
                      ${code}
                    </div>
                    This code will expire in 10 minutes.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 14px; color: #888; padding-top: 20px;">
                    If you didn’t request this, you can safely ignore this email.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 12px; color: #aaa; padding-top: 40px;">
                    &copy; 2025 BEAST Projects. All rights reserved.<br/>
                    440 N Barranca Ave #1313, Covina, CA 91723
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
};

const sendEmail = async (to, code, name) => {
    const html = generateEmailTemplate(name, code)

    const mailOptions = {
        from: `EcoGrid <${process.env.EMAIL_USERNAME}>`,
        to,
        subject: "Verification Code - EcoGrid",
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

module.exports = { sendEmail }