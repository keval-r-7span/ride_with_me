const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/authMiddleware");
const { 
  signup,
  login,
  updateAvailability,
  deleteDriver
  // updateLocation
  // driverViewLocation
} = require("../controllers/driverController"); // Destructure required functions

router.post('/driver/signup', signup);
router.post('/driver/login', login);
router.put('/driver/availability/:id', updateAvailability);
router.delete('/driver/delete/:id', deleteDriver);
// router.post('/driver/location', updateLocation);  // to update driver location
// router.get('/driver/location', driverViewLocation);  // to view rider's location
router.delete('/driver/delete/:id', verifyJWT, deleteDriver);


module.exports = router;
