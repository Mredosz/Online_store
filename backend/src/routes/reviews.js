const express = require("express");
const reviewController = require("../controllers/reviewsControler");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", reviewController.getAllReviewsFromProduct);

router.post(
  "/",
  body("review").isLength({ max: 300 }).withMessage("Review is to long."),
  reviewController.addReview,
);

module.exports = router;
