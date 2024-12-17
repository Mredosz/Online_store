const Product = require("../models/product");
const Category = require("../models/Category");
const checkErrors = require("../util/checkErrors");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).populate(
      "category",
    );
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
  const categoryName = req.body.category;

  try {
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      throw new Error("Category not found!");
    }
    const productDb = await Product.findOne({ name: product.name });
    if (productDb) {
      throw new Error("Product already exists!");
    }
    const newProduct = new Product({ ...product, category: category._id });
    await newProduct.save();
    res.status(201).json({ message: "Created" });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.updateProduct = async (req, res) => {
  if (checkErrors(req, res)) return;
  const productId = req.params.productId;
  const product = req.body;

  try {
    if (product.category) {
      const category = await Category.findOne({ name: product.category });
      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }
      product.category = category._id;
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product.isDeleted = true;
    await product.save();
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.recommendedProducts = async (req, res) => {
  const id = req.params.productId;

  try {
    const productDb = await Product.findById(id).populate("category");

    const categoryDb = await Category.findOne({
      name: productDb.category.name,
    });

    if (!categoryDb) {
      res.status(404).json({ message: "Catrgory not found." });
    }

    const products = await Product.aggregate([
      {
        $match: {
          category: categoryDb._id,
          _id: { $ne: productDb._id },
        },
      },
    ]);
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.filterAndSortProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const { maxPrice, minPrice, category, sort, type } = req.body;

    const aggregationPipeline = [];

    if (query.includes("?")) {
      return res.status(404).json({ message: "Product not found." });
    }

    aggregationPipeline.push({
      $match: {
        price: {
          $gte: parseInt(minPrice) || 0,
          $lte: parseInt(maxPrice) || Infinity,
        },
      },
    });

    if (category && category !== "all") {
      const categoryDb = await Category.findOne({ name: category });
      if (!categoryDb) {
        res.status(404).json({ message: "Category not found." });
      }
      aggregationPipeline.push({
        $match: {
          category: categoryDb._id,
        },
      });
    }

    if (sort === "price") {
      aggregationPipeline.push({
        $sort: {
          price: type === "asc" ? 1 : -1,
        },
      });
    } else if (sort === "review") {
      aggregationPipeline.push(
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
            averageRating: {
              $avg: "$reviewsData.rating",
            },
          },
        },
        {
          $sort: {
            averageRating: type === "asc" ? 1 : -1,
          },
        },
      );
    }

    if (query !== "undefined") {
      aggregationPipeline.push({
        $match: {
          name: { $regex: query, $options: "i" },
        },
      });
    }

    aggregationPipeline.push({
      $match: {
        availableQuantity: { $gt: 0 },
      },
    });

    const products = await Product.aggregate(aggregationPipeline);

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.inventory = async (req, res) => {
  try {
    const products = await Product.find({}, "name availableQuantity");
    res.json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { availableQuantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { availableQuantity },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produkt nie istnieje." });
    }

    res.json(updatedProduct);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
