const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
