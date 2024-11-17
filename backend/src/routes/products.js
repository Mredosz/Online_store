const express = require("express");
const productController = require("../controllers/productsController");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/:productId", productController.getProductById);

router.post("/filter", productController.filterAndSortProducts);
router.post(
  "/",
  body("name")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be at least 3 and 50 max characters long."),
  body("price").isNumeric().withMessage("Price must be a number."),
  body("shortDescription")
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "Short description must be at least 5 and 500 max characters long.",
    ),
  body("availableQuantity")
    .isNumeric()
    .withMessage("Quantity must be a number."),
  body("image").isURL().withMessage("Image must be a URL."),
  productController.addProduct,
);

router.put(
  "/:productId",
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

router.delete("/:productId", productController.deleteProduct);

module.exports = router;
