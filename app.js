// Import required modules
const express = require("express");
const connectDB = require("./src/configs/dbConnection");

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000; // Set port

// Define routes


// Connect to MongoDB Atlas
connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
