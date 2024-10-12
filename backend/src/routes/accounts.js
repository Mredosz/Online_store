const express = require("express");
const { check, body } = require("express-validator");
const accountController = require("../controllers/accountController");
const router = express.Router();

router.get("/logout", accountController.logout);

router.post(
  "/register",
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.",
    ),
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  body("lastName")
    .isLength({ min: 3 })
    .withMessage("Surname must be at least 3 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),

  accountController.register,
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  accountController.login,
);

module.exports = router;
