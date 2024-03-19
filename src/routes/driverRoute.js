const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  deleteDriver, 
  updateDriver,
  availableDrivers
} = require('../controllers/driverController');
const validateRequest = require('../validation/driverValidation');
const validateUpdateRequest = require('../validation/driverValidation');

  router.post('/register', validateRequest, signUp);
  router.post('/login', login);
  router.delete('/delete/:id', deleteDriver);
  router.put('/update/:id', validateUpdateRequest, updateDriver);
  router.get('/available', availableDrivers);

module.exports = router;