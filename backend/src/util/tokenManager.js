const jwt = require("jsonwebtoken");
require("dotenv").config();

const COOKIE_REFRESH_TOKEN = 1000 * 60 * 60 * 24 * 7;
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRED = "7d";

exports.createTokensAndAddToCookie = (res, userDb) => {
  const token = jwt.sign({ id: userDb._id }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRED,
  });
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: false,
    maxAge: COOKIE_REFRESH_TOKEN,
    path: "/",
  });
  return token;
};
