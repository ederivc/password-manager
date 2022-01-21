const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken, createTemporalToken } = require("../helpers/JWT");
const { sendEmail } = require("../helpers/Email");
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

  sendEmail(email, tempToken);

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
      res.redirect("http://localhost:3000/404");
    }

    user[0].status = 1;
    user[0].token = undefined;

    user[0].save();

    res.redirect("http://localhost:3000/login");
  }

  res.redirect("http://localhost:3000/404");
};
