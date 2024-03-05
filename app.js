const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const bookingRoute  = require('./src/routes/bookingRoute')
const {PORT} = require('./src/helper/constant') // Set port
const app = express();

//middleware use
app.use(express.json())

// Define routes
app.use('/api/v1',bookingRoute)

// Connect to MongoDB Atlas
connectDB();
// Start the server
app.listen(PORT || 3200, () => {
  console.log(`🚀 Server is running.. on http://localhost:${PORT}🚀`);
});
