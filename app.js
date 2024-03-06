const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const customerRoute = require('./src/routes/customerRoute')

// Create an instance of Express
const app = express();
app.use(express.json());

const {PORT} = require('./src/helper/constants')// Set port

// Define routes
app.use('/api/v1',bookingRoute)

// Connect to MongoDB Atlas
connectDB();
// Start the server
app.listen(PORT || 3200, () => {
  console.log(`🚀 Server is running.. on http://localhost:${PORT}🚀`);
});
