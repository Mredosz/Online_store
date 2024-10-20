const Product = require("../models/product");
const checkErrors = require("../util/checkErrors");

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
    const product = await Product.findById(productId).populate("reviews");
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addProduct = async (req, res) => {
  if (checkErrors(req, res)) return;
  const product = req.body;
  const categoryId = req.query.categoryId;
  const newProduct = new Product({ ...product, categoryId });
  const products = await Product.find();
  try {
    products.forEach((product) => {
      if (product.name === newProduct.name) {
        throw new Error("Product already exists!");
      }
    });
    await newProduct.save();
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.updateProduct = async (req, res) => {
  if (checkErrors(req, res)) return;
  const productId = req.query.productId;
  const product = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.query.productId;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
