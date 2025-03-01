const express = require("express");
const accessController = require("../controllers/accessController");
const router = express.Router();

router.get("/", accessController.checkAccess);

router.post("/", accessController.checkAccess);

module.exports = router;
