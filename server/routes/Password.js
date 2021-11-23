const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/PasswordController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/getPasswords", validateToken, passwordController.getPasswords);

router.post(
  "/createPassword",
  validateToken,
  passwordController.createPassword
);

module.exports = router;
