const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addCategory = async (req, res) => {
  const category = req.body;
  const newCategory = new Category(category);
  const categories = await Category.find();
  try {
    categories.forEach((category) => {
      if (category.name === newCategory.name) {
        throw new Error("Category already exists!");
      }
    });
    await newCategory.save();
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryId = req.query.categoryId;
  const category = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      category,
      {
        new: true,
      },
    );
    res.status(200).json(updatedCategory);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.query.categoryId;
  try {
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
