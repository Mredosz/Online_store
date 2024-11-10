const Product = require("../models/product");
const checkErrors = require("../util/checkErrors");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId)
      .populate("reviews")
      .populate("category");
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addProduct = async (req, res) => {
  if (checkErrors(req, res)) return;
  const product = req.body;
  const categoryId = req.params.categoryId;
  const newProduct = new Product({ ...product, categoryId });
  const productDb = await Product.findOne({ name: product.name });
  try {
    if (productDb) {
      throw new Error("Product already exists!");
    }
    await newProduct.save();
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.updateProduct = async (req, res) => {
  if (checkErrors(req, res)) return;
  const productId = req.params.productId;
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
  const productId = req.params.productId;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.sortProducts = async (req, res) => {
  const { sort, type } = req.body;
  try {
    if (sort === "price") {
      const products = await Product.aggregate([
        {
          $sort: {
            price: type === "asc" ? 1 : -1,
          },
        },
      ]);
      return res.status(200).json(products);
    }
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviewsData",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviewsData.rating" },
        },
      },
      {
        $sort: {
          averageRating: type === "asc" ? 1 : -1,
        },
      },
    ]);
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.filterProducts = async (req, res) => {
  const { minPrice, maxPrice } = req.body;
  try {
    const products = await Product.aggregate([
      {
        $match: {
          price: {
            $gte: minPrice || 0,
            $lte: maxPrice || Infinity,
          },
        },
      },
    ]);
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
