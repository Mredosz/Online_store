const express = require("express");
const categoryController = require("../controllers/categoriesController");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.post(
  "/",
  body("name")
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be at least 3 characters long."),
  categoryController.addCategory,
);

router.put(
  "/",
  body("name")
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be at least 3 characters long."),
  categoryController.updateCategory,
);

router.delete("/", categoryController.deleteCategory);

module.exports = router;
