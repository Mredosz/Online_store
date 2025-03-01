const jwt = require("jsonwebtoken");

const COOKIE_JWT_TOKEN = 1000 * 60 * 60 * 24 * 7;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_TOKEN_EXPIRED = "7d";

exports.createToken = (res, userDb, platform) => {
  const token = jwt.sign({ id: userDb._id }, JWT_SECRET, {
    expiresIn: JWT_TOKEN_EXPIRED,
  });
  if (platform !== "mobile") {
    res.cookie("Jwt_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: COOKIE_JWT_TOKEN,
      path: "/",
    });
  } else if (platform === "mobile") {
    res.setHeader("Authorization", token);
  }
  return token;
};

exports.getUserIdFromToken = (req, res) => {
  let decodedJwtToken;

  try {
    decodedJwtToken = jwt.verify(
      req.cookies["Jwt_token"] || req.headers["authorization"],
      process.env.JWT_SECRET,
    );
    if (!decodedJwtToken.id) {
      res.status(401).json({ message: "Invalid jwt token: missing id" });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid jwt token" });
    return;
  }
  return decodedJwtToken.id;
};
