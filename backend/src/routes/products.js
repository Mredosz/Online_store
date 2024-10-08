const express = require("express");
const productController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/details", productController.getProductById);
router.get("/category", productController.getProductsByCategory);

router.post("/", productController.addProduct);

router.put("/", productController.updateProduct);

router.delete("/", productController.deleteProduct);

module.exports = router;
