const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
