const express = require("express");
const router = express.Router();
const validateRequest = require("../validation/driverValidation");
const validateUpdate = require("../validation/updateDriverValidation");

const {
  driverSignUp,
  driverLogin
} = require('../controllers/authController')
const {
  deleteDriver, 
  updateDriver,
  availableDrivers
} = require('../controllers/driverController');

  router.post('/driver/register', validateRequest , driverSignUp);
  router.post('/driver/login', driverLogin);
  router.delete('/driver/delete/:id', deleteDriver);
  router.put('/driver/update/:id', validateUpdate , updateDriver);
  router.get('/driver/available', availableDrivers);

module.exports = router;