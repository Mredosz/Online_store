const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);

router.put("/", userController.updateUser);

router.put("/:userId", userController.updateUser);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
