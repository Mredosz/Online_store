const jwt = require("jsonwebtoken");
const { createTokensAndAddToCookie } = require("../util/tokenManager");
require("dotenv").config();

exports.checkAccess = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const ONE_DAY = 1000 * 60 * 60 * 24;

  if (!refreshToken) {
    res.clearCookie("refreshToken");
    return res.status(307).json({ message: "Refresh token missing" });
  }

  let decodedRefreshToken;

  try {
    decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!decodedRefreshToken.id) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token: missing id" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  if (decodedRefreshToken.exp * 1000 < Date.now() + ONE_DAY) {
    try {
      createTokensAndAddToCookie(
        res,
        { _id: decodedRefreshToken.id },
        "refreshToken",
      );
    } catch (err) {
      return res.status(401).json({ message: "Unable to renew refresh token" });
    }
  }

  req.user = { id: decodedRefreshToken.id };
  res.status(204).json("");
  next();
};
