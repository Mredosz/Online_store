const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/", cartController.getCartById);

router.post("/", cartController.addToCart);

router.delete("/", cartController.deleteFromCart);
router.delete("/delete", cartController.deleteCart);

module.exports = router;
