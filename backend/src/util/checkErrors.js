const { validationResult } = require("express-validator");
const checkErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return false;
};

module.exports = checkErrors;
