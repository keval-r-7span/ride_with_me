const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  deleteDriver, 
  updateDriver,
  availableDrivers
} = require('../controllers/driverController');

  router.post('/driver/register', signUp);
  router.post('/driver/login', login);
  router.delete('/driver/delete/:id', deleteDriver);
  router.put('/driver/update/:id', updateDriver);
  router.get('/driver/available', availableDrivers);

module.exports = router;