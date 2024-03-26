const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  deleteDriver, 
  updateDriver,
  availableDrivers,
  addVehicle,
  updateVehicle
} = require('../controllers/driverController');
const {
  validateRequest,
  validtaeAddVehicle
} = require('../validation/driverValidation');
const {
  validateUpdateRequest,
  validateUpdateVehicle
} = require('../validation/updateValidation');

  router.post('/register', validateRequest, signUp);
  router.post('/login', login);
  router.put('/update/:id', validateUpdateRequest, updateDriver);
  router.delete('/delete/:id', deleteDriver);
  router.post('/addvehicle', validtaeAddVehicle, addVehicle);
  router.put('/vehicle/:id', validateUpdateVehicle, updateVehicle);
  router.get('/available', availableDrivers);

module.exports = router;