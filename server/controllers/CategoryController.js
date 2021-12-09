require("dotenv").config({ path: ".env" });
const User = require("../models/User");
const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  const userId = req.user.id;

  const categories = await Category.find({ owner: userId });

  return res.json(categories);
};

exports.createCategory = async (req, res) => {
  const userId = req.user.id;
  const { category } = req.body;

  const newCategory = new Category({
    name: category,
    owner: userId,
  });

  await newCategory.save();

  res.json({ success: "Category created successfully" });
};
