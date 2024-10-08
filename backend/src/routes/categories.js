const express = require("express");
const categoryController = require("../controllers/categoriesController");
const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.post("/", categoryController.addCategory);

router.put("/", categoryController.updateCategory);

router.delete("/", categoryController.deleteCategory);

module.exports = router;
