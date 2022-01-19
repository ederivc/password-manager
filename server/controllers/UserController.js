const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.fetchUser = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select([
    "-_id",
    "-__v",
    "-password",
  ]);

  res.json(user);
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  const { email, phoneNumber, password, newPassword } = req.body;

  if (email !== "" && email !== user.email) {
    const fieldExists = await User.exists({ email });
    if (fieldExists) {
      return res.status(400).json({
        error: `User ${email} already exists. Please try with another one`,
      });
    }
  }

  if (
    phoneNumber !== "" &&
    phoneNumber !== undefined &&
    phoneNumber !== user.phoneNumber
  ) {
    const fieldExists = await User.exists({ phoneNumber });
    if (fieldExists) {
      return res.status(400).json({
        error: `The phone number ${phoneNumber} already exists. Please try with another one`,
      });
    }
  }

  if (newPassword !== "") {
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res
        .status(400)
        .json({ error: "The current password is incorrect" });
    else loggedOutUser = true;
  }

  const userReq = Object.entries(req.body);

  const filteredFields = userReq.filter(([key, value]) => value !== "");

  const updatedValues = Object.fromEntries(filteredFields);
  if (password !== "" && newPassword === "") {
    delete updatedValues.password;
  }

  if (newPassword !== "") {
    const hash = await bcrypt.hash(newPassword, 10);
    updatedValues.password = hash;
    delete updatedValues.newPassword;
    delete updatedValues.confirmPassword;
  }

  const userToUpdate = await User.findById(userId);
  Object.assign(userToUpdate, updatedValues);
  userToUpdate.save();

  res.json({ Success: "User updated" });
};
