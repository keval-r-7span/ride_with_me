const express = require("express");
const router = express.Router();

const {
  updateAvailability,
  deleteDriver
  // updateLocation
  // driverViewLocation
} = require("../controllers/driverController"); 

router.put('/driver/availability/:id', updateAvailability);
router.delete('/driver/delete/:id', deleteDriver);
// router.post('/driver/location', updateLocation);  
// router.get('/driver/location', driverViewLocation); 


module.exports = router;
