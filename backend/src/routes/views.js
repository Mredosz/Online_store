const express = require("express");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.get("/", viewsController.testView);
router.get("/products", viewsController.getAllProducts);

module.exports = router;
