const jwt = require("jsonwebtoken");
const {
  renewToken,
  createTokensAndAddToCookie,
} = require("../util/tokenManager");
const { logout } = require("./accountController");
require("dotenv").config();

exports.checkAccess = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  const ONE_DAY = 1000 * 60 * 60 * 24;

  if (!refreshToken) {
    await logout(req, res);
    return;
  }

  const decodedRefreshToken = jwt.decode(refreshToken);
  let decodedAccessToken;

  if (accessToken) {
    decodedAccessToken = jwt.decode(accessToken);
  }

  if (
    !accessToken ||
    (decodedAccessToken && decodedAccessToken.exp * 1000 < Date.now())
  ) {
    createTokensAndAddToCookie(res, decodedRefreshToken.id, "accessToken");
  } else {
    try {
      req.user = jwt.verify(accessToken, process.env.JWT_SECRET);
      next();
    } catch (err) {
      return res.status(401).json({ message: "Access token invalid" });
    }
  }

  if (decodedRefreshToken.exp * 1000 < Date.now() + ONE_DAY) {
    renewToken(res, decodedRefreshToken, "refreshToken");
  }

  try {
    req.user = jwt.verify(refreshToken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};
