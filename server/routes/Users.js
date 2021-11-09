const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const userController = require("../controllers/UserController");

router.post("/", userController.createuser);

router.get("/profile", validateToken, (req, res) => {
  res.json({ success: "Profile" });
});

module.exports = router;
