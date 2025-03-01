const jwt = require("jsonwebtoken");
const { createToken } = require("../util/tokenManager");

exports.checkAccess = async (req, res, next) => {
  const platform = req.body.platform;

  const jwtToken = req.headers["authorization"];
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
      createToken(res, { _id: decodedJwtToken.id }, platform);
    } catch (err) {
      return res.status(401).json({ message: "Unable to renew Jwt token" });
    }
  }

  req.user = { id: decodedJwtToken.id };
  res.status(204).json("");
  next();
};
