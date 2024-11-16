const jwt = require("jsonwebtoken");
require("dotenv").config();

const COOKIE_REFRESH_TOKEN = 1000 * 60 * 60 * 24 * 7;
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRED = "7d";

exports.createTokensAndAddToCookie = (res, userDb) => {
  const token = jwt.sign({ id: userDb._id }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRED,
  });
  res.cookie("Jwt_token", token, {
    httpOnly: true,
    secure: false,
    maxAge: COOKIE_REFRESH_TOKEN,
    path: "/",
  });
  return token;
};

exports.getUserIdFromToken = (req, res) => {
  let decodedRefreshToken;

  try {
    decodedRefreshToken = jwt.verify(
      req.cookies["Jwt_token"],
      process.env.JWT_SECRET,
    );
    if (!decodedRefreshToken.id) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token: missing id" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
  return decodedRefreshToken.id;
};
