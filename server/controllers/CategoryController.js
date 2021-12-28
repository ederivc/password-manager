require("dotenv").config({ path: ".env" });
const User = require("../models/User");
const Category = require("../models/Category");
const Password = require("../models/Password");

exports.getCategories = async (req, res) => {
  const userId = req.user.id;

  const categories = await Category.find({ owner: userId });
  const passwords = await Password.find({ owner: userId });

  const mappedCategories = categories.map((current) => {
    const passwordsCounter = passwords.filter(
      (password) => password.categoryName === current.name
    ).length;

    const currentCategory = current._doc;

    return { ...currentCategory, passwords: passwordsCounter };
  });

  return res.json(mappedCategories);
};

exports.createCategory = async (req, res) => {
  const userId = req.user.id;
  const { category } = req.body;

  const categories = await Category.find({ owner: userId });
  const passwords = await Password.find({ owner: userId });

  categories.forEach((current) => {
    if (current.name.toLowerCase().trim() === category.toLowerCase().trim()) {
      return res
        .status(400)
        .json({ error: "The category name already exists" });
    }
  });

  const newCategory = new Category({
    name: category,
    owner: userId,
  });

  await newCategory.save();

  res.json({ success: "Category created successfully" });
};
