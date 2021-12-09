const CryptoJS = require("crypto-js");
require("dotenv").config({ path: ".env" });
const User = require("../models/User");
const Password = require("../models/Password");
const Category = require("../models/Category");

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

exports.updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { id, passwordName, password, category } = req.body;

  const currentPassword = await Password.findById(id);

  const passwords = await Password.find({ owner: userId });

  const nameExists = passwords.find(
    (password) =>
      password.id !== currentPassword.id && password.name === passwordName
  );

  if (nameExists) {
    return res.status(400).json({ error: "The password name already exists" });
  }

  const userCategories = await Category.find({ owner: userId });

  const categoryId = userCategories.filter(
    (categoryArray) => categoryArray.name === category
  );

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_PASSWORDS_KEY
  ).toString();

  const updatedPasswordValues = {
    name: passwordName,
    password: encryptedPassword,
  };

  if (category !== "You haven't created any category" && category !== "None") {
    updatedPasswordValues.category = categoryId[0]._id;
    updatedPasswordValues.categoryName = categoryId[0].name;
  }

  Object.assign(currentPassword, updatedPasswordValues);

  currentPassword.save();

  res.json({ success: "Password updated successfully" });
};
