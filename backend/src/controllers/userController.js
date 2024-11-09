const checkErrors = require("../util/checkErrors");
const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  if (checkErrors(req, res)) return;
  const users = await User.find();
  try {
    res.status(200).json(users);
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
