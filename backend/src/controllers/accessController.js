const jwt = require("jsonwebtoken");
const { createTokensAndAddToCookie } = require("../util/tokenManager");
require("dotenv").config();

exports.checkAccess = async (req, res, next) => {
  const jwtToken = req.cookies["Jwt_token"];
  const ONE_DAY = 1000 * 60 * 60 * 24;

  if (!jwtToken) {
    res.clearCookie("Jwt_token");
    return res.status(401).json({ message: "Jwt token missing" });
  }

  let decodedJwtToken;

  try {
    decodedJwtToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!decodedJwtToken.id) {
      return res.status(401).json({ message: "Invalid jwt token: missing id" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Jwt token" });
  }

  if (decodedJwtToken.exp * 1000 < Date.now() + ONE_DAY) {
    try {
      createTokensAndAddToCookie(
        res,
        { _id: decodedJwtToken.id },
        "refreshToken",
      );
    } catch (err) {
      return res.status(401).json({ message: "Unable to renew Jwt token" });
    }
  }

  req.user = { id: decodedJwtToken.id };
  res.status(204).json("");
  next();
};
