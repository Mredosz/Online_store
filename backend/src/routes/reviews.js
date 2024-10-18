const express = require("express");
const reviewController = require("../controllers/reviewsControler");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", reviewController.getAllReviewsFromProduct);

router.post(
  "/",
  body("review")
    .isLength({ min: 3, max: 300 })
    .withMessage("Review is to long."),
  body("rating").isNumeric().withMessage("Rating must be a number."),
  reviewController.addReview,
);

module.exports = router;
