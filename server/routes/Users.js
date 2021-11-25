const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validateToken } = require("../middlewares/AuthMiddleware");
const userController = require("../controllers/UserController");

router.get("/account", validateToken, userController.fetchUser);

router.put("/updateUser", validateToken, userController.updateUser);

router.get("/fetchUsers", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

router.get("/deleteUsers", async (req, res) => {
  await User.deleteMany({});
  return res.json({ Success: "Deleted" });
});

module.exports = router;
