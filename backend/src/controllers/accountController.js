const User = require("../models/user");
const bcrypt = require("bcryptjs");
const checkErrors = require("../util/checkErrors");
const { createToken } = require("../util/tokenManager");

exports.register = async (req, res) => {
  if (checkErrors(req, res)) return;
  const user = req.body;

  try {
    const userDb = await User.findOne({ email: user.email });
    if (userDb) {
      res.status(409).json({ message: "User already exist." });
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Created" });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  if (checkErrors(req, res)) return;
  const user = req.body.user;
  const platform = req.body.platform;
  const userDb = await User.findOne({ email: user.email });

  try {
    const doMatch = await bcrypt.compare(user.password, userDb.password);
    if (userDb.email === user.email && doMatch) {
      createToken(res, userDb, platform);

      res.status(200).json({ message: "Logged in", role: userDb.role });
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("Jwt_token");
  res.status(200).json({ message: "Logged out" });
};
