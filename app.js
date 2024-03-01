const express = require("express");
const connectDB = require("./src/configs/dbConnection");
const driverRoute = require('./src/routes/driverRoute');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3001; // Set port

app.use(express.json);
// Define routes
app.use('/api/v1',driverRoute);


// Connect to MongoDB Atlas
connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running.. on http://localhost:${PORT}`);
});
