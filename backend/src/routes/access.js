const express = require("express");
const accessController = require("../controllers/accessController");
const router = express.Router();

router.get("/", accessController.checkAccess);

module.exports = router;
