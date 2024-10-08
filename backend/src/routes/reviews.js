const express = require("express");
const reviewController = require("../controllers/reviewsControler");
const router = express.Router();

router.get("/", reviewController.getAllReviewsFromProduct);

router.post("/", reviewController.addReview);

module.exports = router;
