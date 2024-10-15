const jwt = require("jsonwebtoken");
require("dotenv").config();

const COOKIE_REFRESH_TOKEN = 1000 * 60 * 60 * 24 * 7;
const COOKIE_ACCESS_TOKEN = 1000 * 60 * 15;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_EXPIRED = "15m";
const ACCESS_TOKEN_EXPIRED = "7d";

exports.createTokensAndAddToCookie = (res, userDb, tokenType) => {
  const maxAge =
    tokenType === "accessToken" ? COOKIE_REFRESH_TOKEN : COOKIE_ACCESS_TOKEN;
  const expired =
    tokenType === "accessToken" ? ACCESS_TOKEN_EXPIRED : REFRESH_TOKEN_EXPIRED;

  const token = jwt.sign({ id: userDb._id }, JWT_SECRET, {
    expiresIn: expired,
  });
  res.cookie(tokenType, token, {
    httpOnly: true,
    secure: false,
    maxAge: maxAge,
    path: "/",
  });
  return token;
};
