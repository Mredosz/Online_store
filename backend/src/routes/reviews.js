const express = require("express");
const reviewController = require("../controllers/reviewsControler");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", reviewController.getAllReviews);
router.get("/:productId", reviewController.getAllReviewsFromProduct);

router.post(
  "/:productId",
  body("review")
    .isLength({ min: 3, max: 300 })
    .withMessage("Review is to long."),
  body("rating").isNumeric().withMessage("Rating must be a number."),
  body("isAccepted").isBoolean().withMessage("isAccepted must be a boolean."),
  reviewController.addReview,
);

router.put(
  "/:reviewId",
  body("isAccepted").isBoolean().withMessage("isAccepted must be a boolean."),
  reviewController.acceptReview,
);

module.exports = router;
