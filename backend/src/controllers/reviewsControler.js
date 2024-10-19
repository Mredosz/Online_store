const Review = require("../models/review");
const checkErrors = require("../util/checkErrors");

exports.getAllReviewsFromProduct = async (req, res) => {
  const productId = req.query.productId;
  try {
    const reviews = await Review.find({ productId: productId });
    res.status(200).json(reviews);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addReview = async (req, res) => {
  if (checkErrors(req, res)) return;
  const productId = req.query.productId;
  const opinion = req.body;
  const newReview = new Review({ ...opinion, productId });
  const reviews = await Review.find();
  try {
    reviews.forEach((opinion) => {
      if (opinion.review === newReview.review) {
        throw new Error("Review already exist.");
      }
    });
    await newReview.save();
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
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
