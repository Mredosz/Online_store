const User = require("../models/user");
const { getUserIdFromToken } = require("../util/tokenManager");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    res.status(200).json(users);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = getUserIdFromToken(req, res);
  const user = req.body;
  const usersDb = await User.findByIdAndUpdate(userId, user);
  try {
    res.status(200).json(usersDb);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
