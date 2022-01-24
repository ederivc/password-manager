const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config({ path: ".env" });
const { createToken, createTemporalToken } = require("../helpers/JWT");
const {
  sendEmail,
  mailRegister,
  mailResetPassword,
} = require("../helpers/Email");
const { validateTemporalToken } = require("../middlewares/AuthMiddleware");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.exists({ email });

  if (!userExists)
    return res.status(400).json({ error: "User does not exist" });

  const user = await User.findOne({ email });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.status(400).json({ error: "Incorrect email or password" });

  if (!user.status)
    return res
      .status(400)
      .json({ error: "The account has not been activated yet" });

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

  const tempToken = createTemporalToken(email);

  const newUser = new User({
    name,
    email,
    password: hash,
    token: tempToken,
  });

  await newUser.save();

  sendEmail(mailRegister, email, tempToken);

  res.json({ success: "User created successfully" });
};

exports.logout = async (req, res) => {
  res.cookie("access-token", "", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.json({ success: "logged out" });
};

exports.activateAccount = async (req, res) => {
  const token = req.params.token;
  const isValid = validateTemporalToken(req.params.token);

  if (isValid) {
    const user = await User.find({ email: isValid });

    if (token !== user[0].token) {
      // This may happen when the account has already been activated
      res.redirect(`${process.env.CLIENT_SERVER}/404`);
    }

    user[0].status = 1;
    user[0].token = undefined;

    user[0].save();

    res.redirect(`${process.env.CLIENT_SERVER}/login`);
  }

  res.redirect(`${process.env.CLIENT_SERVER}/404`);
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }

  const tempToken = createTemporalToken(user.email);

  user.token = tempToken;

  user.save();

  sendEmail(mailResetPassword, email, tempToken);

  res.json({
    success:
      "Please enter to you email address. We have sent you an email to reset your password",
  });
};

exports.redirectResetPassword = async (req, res) => {
  const token = req.params.token;
  const userEmail = validateTemporalToken(token);

  if (userEmail) {
    const user = await User.find({ email: userEmail });

    return res.redirect(
      `${process.env.CLIENT_SERVER}/resetPassword/${user[0]._id}/${token}`
    );
  }

  return res.redirect(`${process.env.CLIENT_SERVER}/404`);
};

exports.resetPassword = async (req, res) => {
  const { userId, token, password } = req.body;
  const userEmail = validateTemporalToken(token);

  if (userEmail) {
    const user = await User.findById(userId);

    if (token !== user.token || user.email !== userEmail) {
      // This may happen when the password has already been changed
      // Or if the link has been modified
      return res.status(400).json({
        error: `Your token is invalid or has expired. Plese request a new password reset link. `,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    user.password = hash;
    user.token = undefined;

    user.save();

    return res.json({ success: "Password updated" });
  }

  return res.status(400).json({
    error: `Your token is invalid or has expired. Plese request a new password reset link. `,
  });
};
