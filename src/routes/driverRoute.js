const express = require("express");
const router = express.Router();

const {
  driverSignUp,
  driverlogin
} = require('../controllers/driverController');
const {
  deleteDriver, 
  updateDriver,
  availableDrivers
} = require('../controllers/driverController');

  router.post('/driver/register', driverSignUp);
  router.post('/driver/login', driverlogin);
  router.delete('/driver/delete/:id', deleteDriver);
  router.put('/driver/update/:id', updateDriver);
  router.get('/driver/available', availableDrivers);

module.exports = router;