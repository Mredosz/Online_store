const express = require("express");
const orderController = require("../controllers/orderContorller");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/details", orderController.getOrderById);

router.post(
  "/",
  body("postalCode").isPostalCode("PL").withMessage("Postal code is invalid."),
  orderController.addOrder,
);

module.exports = router;
