const express = require("express");
const productController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/details", productController.getProductById);

router.post("/", productController.addProduct);

module.exports = router;
