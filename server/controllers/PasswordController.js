const User = require("../models/User");
const Password = require("../models/Password");
const bcrypt = require("bcrypt");

exports.createPassword = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  const numberOfPasswords = await Password.countDocuments({ owner: userId });

  const newPassword = new Password({
    name: `Password #${numberOfPasswords + 1}`,
    password: password,
    owner: userId,
  });

  await newPassword.save();

  res.json({ success: "Password created successfully" });
};

exports.getPasswords = async (req, res) => {
  const userId = req.user.id;

  const passwords = await Password.find({ owner: userId });

  return res.json(passwords);
};
