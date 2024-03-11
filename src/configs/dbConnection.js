const mongoose = require("mongoose");
const { DB_DATA } = require("../helper/constants");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(DB_DATA.DB_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

module.exports = connectDB;
