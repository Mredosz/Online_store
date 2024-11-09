const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/", cartController.getCartById);

router.post("/", cartController.addToCart);

router.delete("/:productId", cartController.deleteFromCart);
router.delete("/", cartController.deleteCart);

module.exports = router;
