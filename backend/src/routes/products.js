const express = require("express");
const productController = require("../controllers/productsController");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/details", productController.getProductById);
router.get("/category", productController.getProductsByCategory);

router.post(
  "/",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  body("shortDescription")
    .isLength({ min: 5 })
    .withMessage("Short description must be at least 5 characters long."),
  body("price").isNumeric().withMessage("Price must be a number."),
  body("image").isURL().withMessage("Image must be a URL."),
  productController.addProduct,
);

router.put(
  "/",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  body("shortDescription")
    .isLength({ min: 5 })
    .withMessage("Short description must be at least 5 characters long."),
  body("price").isNumeric().withMessage("Price must be a number."),
  body("image").isURL().withMessage("Image must be a URL."),
  productController.updateProduct,
);

router.delete("/", productController.deleteProduct);

module.exports = router;
