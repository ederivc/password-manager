const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailRegisterOptions = (email, token) => {
  return {
    from: "vallaveterinaria569@gmail.com",
    to: email,
    subject: "Password Manager | Activate your Account",
    text: `
    Hi! Thanks for registering. To activate your account, please clcik on the following link".
    http://localhost:5000/api/auth/activateAccount/${token}
    `,
  };
};

const sendEmail = (email, token) => {
  transporter.sendMail(mailRegisterOptions(email, token), (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail };
