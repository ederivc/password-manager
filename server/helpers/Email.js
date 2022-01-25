const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailRegister = (email, token) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Manager | Activate your Account",
    text: `
    Hi! Thanks for registering. To activate your account, please clcik on the following link
    ${process.env.SERVER}/api/auth/activateAccount/${token}
    `,
  };
};

const mailResetPassword = (email, token) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Manager | Reset Password",
    text: `
    Hi, We received a request to reset the password of your account.
    To reset your password, click on the link below:
    ${process.env.SERVER}/api/auth/resetPassword/${token}
    If this was a mistake, just ignore this email and nothing will happen.
    `,
  };
};

const sendEmail = (emailType, email, token) => {
  transporter.sendMail(emailType(email, token), (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail, mailRegister, mailResetPassword };
