const mongoose = require("mongoose");
require("dotenv").config();

const _URL =
  process.env.MONGO_URI || "mongodb://user:password@localhost:27017/mongo_db";

const connect = async () => {
  try {
    return await mongoose.connect(_URL);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

module.exports = connect;
