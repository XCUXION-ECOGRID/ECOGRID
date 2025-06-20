const mailer = require('nodemailer');
require('dotenv').config()

const transporter = mailer.createTransport({
    host: process.env.EMAIL_SERVER || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "465"),
    secure: process.env.EMAIL_SECURE,
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

//ensures the transporter is working as intended
transporter.verify((error, success) => {
  if(error){
    console.log('Email transporter verification failed')
  }else {
    console.log('Email transporter ready to send mail')
  }
})

const generateEmailTemplate = (name, code) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verification Code</title>
      <style>
        body {
          margin: 0 20px;
          padding: 0;
          background-color: #f4f6f8;
          font-family: 'Segoe UI', sans-serif;
        }
        .wrapper {
          width: 100%;
          padding: 40px 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          padding: 40px;
        }
        .logo {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          color: #2e7d32;
          margin-bottom: 30px;
        }
        .title {
          font-size: 20px;
          color: #222;
          font-weight: bold;
          text-align: center;
        }
        .content {
          font-size: 16px;
          color: #555;
          text-align: center;
          padding: 20px 0;
          line-height: 1.6;
        }
        .code {
          font-size: 32px;
          color: #000;
          font-weight: bold;
          margin: 20px 0;
          background-color: #f0f0f0;
          display: inline-block;
          padding: 10px 20px;
          border-radius: 6px;
        }
        .button-container {
          text-align: center;
          margin-top: 30px;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #888;
          margin-top: 40px;
        }
        .small-footer {
          font-size: 12px;
          color: #aaa;
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="email-container">
          <div class="logo">EcoGrid</div>
          <div class="title">Login Verification Code</div>
          <div class="content">
            Hi <strong>${name}</strong>,<br/><br/>
            Please use the verification code below to complete your login.<br/>
            This code will expire in <strong>10 minutes</strong>.
            <div class="code">${code}</div>
          </div>
          <div class="footer">
            If you didn't request this code, you can safely ignore this email.
          </div>
          <div class="small-footer">
            &copy; 2025 BEAST Projects. All rights reserved.<br/>
            440 N Barranca Ave #1313, Covina, CA 91723
          </div>
        </div>
      </div>
    </body>
    </html>
    `
}


const sendEmail = async (to, code, name) => {
    const html = generateEmailTemplate(name, code)

    const mailOptions = {
        from: `EcoGrid <${process.env.EMAIL_USERNAME}>`,
        to,
        subject: "Verification Code - EcoGrid",
        html,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent to', to);
        return info
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
}


const mailForForgotPassword = (name, code ) => {
   return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verification Code</title>
      <style>
        body {
          margin: 0 20px;
          padding: 0;
          background-color: #f4f6f8;
          font-family: 'Segoe UI', sans-serif;
        }
        .wrapper {
          width: 100%;
          padding: 40px 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          padding: 40px;
        }
        .logo {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          color: #2e7d32;
          margin-bottom: 30px;
        }
        .title {
          font-size: 20px;
          color: #222;
          font-weight: bold;
          text-align: center;
        }
        .content {
          font-size: 16px;
          color: #555;
          text-align: center;
          padding: 20px 0;
          line-height: 1.6;
        }
        .code {
          font-size: 32px;
          color: #000;
          font-weight: bold;
          margin: 20px 0;
          background-color: #f0f0f0;
          display: inline-block;
          padding: 10px 20px;
          border-radius: 6px;
        }
        .button-container {
          text-align: center;
          margin-top: 30px;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #888;
          margin-top: 40px;
        }
        .small-footer {
          font-size: 12px;
          color: #aaa;
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="email-container">
          <div class="logo">EcoGrid</div>
          <div class="title">Forgot Password Code</div>
          <div class="content">
            Hi <strong>${name}</strong>,<br/><br/>
            Please use the six character verification code below to change your password.<br/>
            This code will expire in <strong>10 minutes</strong>.
            <div class="code">${code}</div>
          </div>
          <div class="footer">
            If you didn't request this code, you can safely ignore this email.
          </div>
          <div class="small-footer">
            &copy; 2025 BEAST Projects. All rights reserved.<br/>
            440 N Barranca Ave #1313, Covina, CA 91723
          </div>
        </div>
      </div>
    </body>
    </html>
    `
}

const sendForgotPasswordMail = async (to, sixDigitCode, name) =>{
  const html = mailForForgotPassword(name, sixDigitCode);

  const mailOptions = {
    from: `EcoGrid <${process.env.EMAIL_USERNAME}>`,
      to,
      subject: "Verification Code - EcoGrid",
      html, 
  }
  try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent to', to);
        return info
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
}



module.exports = { sendEmail, transporter, sendForgotPasswordMail }