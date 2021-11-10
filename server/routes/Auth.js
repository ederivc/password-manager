const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
// const userController = require("../controllers/UserController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/fetchAuthUser", validateToken, async (req, res) => {
  return res.json(req.user);
});

module.exports = router;
