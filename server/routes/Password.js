const express = require("express");
const router = express.Router();
const Password = require("../models/Password");
const passwordController = require("../controllers/PasswordController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/getPasswords", validateToken, passwordController.getPasswords);

router.post(
  "/getCategoryPasswords",
  validateToken,
  passwordController.getCategoryPasswords
);

router.post(
  "/createPassword",
  validateToken,
  passwordController.createPassword
);

router.delete(
  "/deletePassword",
  validateToken,
  passwordController.deletePassword
);

router.get("/deletePasswords", async (req, res) => {
  await Password.deleteMany({});
  return res.json({ success: "Deleted" });
});

router.put("/updatePassword", validateToken, passwordController.updatePassword);

module.exports = router;
