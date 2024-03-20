const mongoose = require("mongoose");
const { DB_DATA } = require("../helper/constants");
require("dotenv").config();
const logger = require('../utils/indexLogger')

const connectDB = async () => {
  try {
    await mongoose.connect(DB_DATA.DB_URL);
    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    logger.error("Error connecting to MongoDB Atlas:", error);
  }
};

module.exports = connectDB;
