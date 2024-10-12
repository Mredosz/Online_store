const User = require("../models/user");
const checkErrors = require("../util/checkErrors");

exports.register = async (req, res) => {
  if (checkErrors(req, res)) return;
  const user = req.body;
  const newUser = new User(user);
  const users = await User.find();
  try {
    users.forEach((user) => {
      if (user.email === newUser.email) {
        throw new Error("User already exist.");
      }
    });
    await newUser.save();
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  if (checkErrors(req, res)) return;
  const user = req.body;
  const users = await User.find();
  try {
    users.forEach((userDb) => {
      if (userDb.email === user.email && userDb.password === user.password) {
        res.status(200).json("Logged in");
      }
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json("Logged out");
};
