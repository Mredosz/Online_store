const User = require("../models/user");
const bcrypt = require("bcryptjs");
const checkErrors = require("../util/checkErrors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  if (checkErrors(req, res)) return;
  const user = req.body;

  try {
    const userDb = await User.findOne({ email: user.email });
    if (userDb) {
      throw new Error("User already exist.");
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();

    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  if (checkErrors(req, res)) return;
  const user = req.body;
  const userDb = await User.findOne({ email: user.email });

  try {
    const doMatch = await bcrypt.compare(user.password, userDb.password);
    if (userDb.email === user.email && doMatch) {
      const token = jwt.sign({ id: userDb._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60,
          path: "/",
        })
        .status(200)
        .json({ message: "Logged in", role: userDb.role });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json("Logged out");
};
