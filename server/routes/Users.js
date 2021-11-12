const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/profile", validateToken, (req, res) => {
  res.json({ success: "Profile" });
});

router.get("/fetchUsers", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

router.get("/deleteUsers", async (req, res) => {
  await User.deleteMany({});
  return res.json({ Success: "Deleted" });
});

module.exports = router;
