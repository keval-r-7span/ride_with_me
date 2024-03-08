const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  deleteDriver, 
  updateDriver
} = require('../controllers/driverController')

  router.post('/driver/register', signUp);
  router.post('/driver/login', login);

  router.delete('/driver/delete/:id', deleteDriver);
  router.put('/driver/update/:id', updateDriver);

module.exports = router;