const Product = require("../models/product");

exports.testView = (req, res) => {
  res.render("index", { title: "Home Page", message: "Welcome to " });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().lean();

  res.render("products", { products });
};
