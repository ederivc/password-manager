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
    return res.status(400).json({ error: "Incorrect email or password" });

  const accessToken = createToken(user);

  res.cookie("access-token", accessToken, {
    maxAge: 2592000000, // 30 days
    // expiresIn: 3600, // 1 hour
    httpOnly: true,
    // secure: true,
  });

  res.json({ success: "logged in", name: user.name });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.exists({ email });

  if (userExists) {
    return res.status(400).json({
      error: `User ${email} already exists. Please try with another one`,
    });
  }

  const hash = await bcrypt.hash(password, 10);

  newUser = new User({
    name,
    email,
    password: hash,
  });

  await newUser.save();

  res.json({ success: "User created successfully" });
};

exports.logout = async (req, res) => {
  res.cookie("access-token", "", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.json({ success: "logged out" });
};
