const Review = require("../models/review");
const Product = require("../models/product");
const checkErrors = require("../util/checkErrors");
const jwt = require("jsonwebtoken");
const { getUserIdFromToken } = require("../util/tokenManager");

exports.getAllReviewsFromProduct = async (req, res) => {
  const productId = req.query.productId;
  try {
    const reviews = await Review.find({ productId: productId }).populate(
      "userId",
    );
    res.status(200).json(reviews);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addReview = async (req, res) => {
  if (checkErrors(req, res)) return;
  const productId = req.query.productId;
  const userId = getUserIdFromToken(req, res);
  const opinion = req.body;
  const newReview = new Review({
    ...opinion,
    date: Date.now(),
    productId,
    userId,
    isAccepted: false,
  });

  try {
    const existingReview = await Review.findOne({
      productId: productId,
      userId: userId,
    });

    if (existingReview) {
      throw new Error("Review already exist.");
    }

    const savedReview = await newReview.save();
    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: savedReview._id },
    });
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId")
      .populate("productId");
    res.status(200).json(reviews);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.acceptReview = async (req, res) => {
  if (checkErrors(req, res)) return;
  const reviewId = req.query.reviewId;
  const isAccepted = req.body.isAccepted;
  try {
    await Review.findByIdAndUpdate(reviewId, { isAccepted });
    res.status(200).json("Accepted");
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
