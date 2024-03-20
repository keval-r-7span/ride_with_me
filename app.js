const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const indexRoute = require("./src/routes/index");
const { PORT } = require("./src/helper/constants");
const logger = require('./src/utils/logger')

const app = express();

// app.use(cookieParser());
app.use(express.json());

// Define routes
app.use("/api/v1", indexRoute);

// Connect to MongoDB Atlas .
connectDB();

// Start the server
app.listen(PORT || 3200, () => {
  logger.info(`🚀 Server is running.. on http://localhost:${PORT}🚀`);
});
