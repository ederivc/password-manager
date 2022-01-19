const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const categoryController = require("../controllers/CategoryController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/getCategories", validateToken, categoryController.getCategories);

router.post(
  "/createCategory",
  validateToken,
  categoryController.createCategory
);

module.exports = router;
