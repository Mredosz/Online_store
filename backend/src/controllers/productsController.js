const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.query.productId;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

// exports.getTopRatedProducts = async (req, res) => {
//   try{
//     const products = await Product.find().sort()
//   }
// }
