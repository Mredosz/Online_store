const express = require("express");
const userController = require("../controllers/accountController");
const router = express.Router();

router.get("/logout", userController.logout);

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
