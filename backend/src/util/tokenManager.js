const jwt = require("jsonwebtoken");
require("dotenv").config();

const COOKIE_JWT_TOKEN = 1000 * 60 * 60 * 24 * 7;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_TOKEN_EXPIRED = "7d";

exports.createTokensAndAddToCookie = (res, userDb) => {
  const token = jwt.sign({ id: userDb._id }, JWT_SECRET, {
    expiresIn: JWT_TOKEN_EXPIRED,
  });
  res.cookie("Jwt_token", token, {
    httpOnly: true,
    secure: false,
    maxAge: COOKIE_JWT_TOKEN,
    path: "/",
  });
  return token;
};

exports.getUserIdFromToken = (req, res) => {
  let decodedJwtToken;

  try {
    decodedJwtToken = jwt.verify(
      req.cookies["Jwt_token"],
      process.env.JWT_SECRET,
    );
    if (!decodedJwtToken.id) {
      return res.status(401).json({ message: "Invalid jwt token: missing id" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid jwt token" });
  }
  return decodedJwtToken.id;
};
