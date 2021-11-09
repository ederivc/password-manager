const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/JWT");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.exists({ email });

  if (!userExists)
    return res.status(400).json({ error: "User does not exist" });

  const user = await User.findOne({ email });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.status(400).json({ error: "Incorrect password" });

  const accessToken = createToken(user);

  res.cookie("access-token", accessToken, {
    maxAge: 2592000000, // 30 days
    // expiresIn: 3600, // 1 hour
  });

  res.json({ success: "logged in" });
};
