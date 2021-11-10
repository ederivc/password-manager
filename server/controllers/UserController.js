// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// exports.createuser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.exists({ email });

//   if (userExists) {
//     return res.status(400).json({ error: "User already exists" });
//   }

//   const hash = await bcrypt.hash(password, 10);

//   newUser = new User({
//     name,
//     email,
//     password: hash,
//   });

//   await newUser.save();

//   res.json({ success: "User created successfully" });
// };
