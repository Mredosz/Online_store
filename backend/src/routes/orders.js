const express = require("express");
const orderController = require("../controllers/orderContorller");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:orderId", orderController.getOrderById);

router.post(
  "/",
  body("totalPrice").isNumeric().withMessage("Total price is invalid."),
  body("address.street")
    .isLength({ min: 3, max: 50 })
    .withMessage("Street is invalid, min 3, max 50."),
  body("address.city")
    .isLength({ min: 3, max: 50 })
    .withMessage("City is invalid, min 3, max 50."),
  body("address.postalCode")
    .isPostalCode("PL")
    .withMessage("Postal code is invalid."),
  body("address.homeNumber")
    .isLength({ min: 1, max: 10 })
    .withMessage("Home number is invalid, min 1, max 10."),
  body("address.phoneNumber")
    .isLength({ min: 9, max: 12 })
    .withMessage("Phone number is invalid."),
  body("address.deliveryType")
    .isLength({ min: 3, max: 50 })
    .withMessage("Delivery type is invalid."),
  body("address.paymentMethod")
    .isLength({ min: 3, max: 30 })
    .withMessage("Payment method is invalid"),
  orderController.addOrder,
);

router.put(
  "/:orderId",
  body("status")
    .isString()
    .isIn(["processing", "confirmed", "shipped", "delivered"])
    .withMessage(
      "Invalid status. Must be one of: processing, confirmed, shipped, delivered",
    ),
  orderController.changeOrderStatus,
);

module.exports = router;
