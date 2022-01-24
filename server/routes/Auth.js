const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/fetchAuthUser", validateToken, async (req, res) => {
  return res.json(req.user);
});

router.get("/activateAccount/:token", authController.activateAccount);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);
router.get("/resetPassword/:token", authController.redirectResetPassword);

module.exports = router;
