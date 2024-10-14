const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.checkAccess = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expire or is invalid." });
  }
};
