const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const customerRoute = require("./src/routes/customerRoute");
const bookingRoute = require("./src/routes/bookingRoute");

const app = express();
app.use(express.json());

const { PORT } = require("./src/helper/constants");

// Define routes
app.use("/api/v1", bookingRoute);
app.use("/api/v1", customerRoute);

// Connect to MongoDB Atlas
const {PORT} = require('./src/helper/constant')

// Define routes
app.use('/api/v1',driverRoute); 

// Connect to MongoDB Atlas .
connectDB();

// Start the server
app.listen(PORT || 3200, () => {
  console.log(`🚀 Server is running.. on http://localhost:${PORT}🚀`);
});
