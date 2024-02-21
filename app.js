// Import required modules
const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const adminRoute = require('./src/routes/adminRoute')

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000; // Set port

// Define routes
app.use('/api/v1',adminRoute)


// Connect to MongoDB Atlas
connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
