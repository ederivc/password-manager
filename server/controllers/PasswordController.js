const CryptoJS = require("crypto-js");
require("dotenv").config({ path: ".env" });
const Password = require("../models/Password");

exports.createPassword = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  const numberOfPasswords = await Password.countDocuments({ owner: userId });

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_PASSWORDS_KEY
  ).toString();

  const newPassword = new Password({
    name: `Password #${numberOfPasswords + 1}`,
    password: encryptedPassword,
    owner: userId,
  });

  await newPassword.save();

  res.json({ success: "Password created successfully" });
};

exports.getPasswords = async (req, res) => {
  const userId = req.user.id;

  const passwords = await Password.find({ owner: userId });

  decodedPasswords = passwords.forEach((password) => {
    const passwordBytes = CryptoJS.AES.decrypt(
      password.password,
      process.env.SECRET_PASSWORDS_KEY
    );
    const decodedPassword = passwordBytes.toString(CryptoJS.enc.Utf8);
    password.password = decodedPassword;
  });

  return res.json(passwords);
};
