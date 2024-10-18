const express = require("express");
const orderController = require("../controllers/orderContorller");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/details", orderController.getOrderById);

router.post(
  "/",
  body("totalPrice").isNumeric().withMessage("Total price is invalid."),
  body("date").isDate().withMessage("Date is invalid."),
  body("street")
    .isLength({ min: 3, max: 50 })
    .withMessage("Street is invalid, min 3, max 50."),
  body("city")
    .isLength({ min: 3, max: 50 })
    .withMessage("City is invalid, min 3, max 50."),
  body("postalCode").isPostalCode("PL").withMessage("Postal code is invalid."),
  body("homeNumber")
    .isLength({ min: 1, max: 10 })
    .withMessage("Home number is invalid, min 1, max 10."),
  body("phoneNumber")
    .isMobilePhone("pl-PL")
    .withMessage("Phone number is invalid."),
  orderController.addOrder,
);

module.exports = router;
