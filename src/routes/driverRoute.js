const express = require("express");
const router = express.Router();

const {
  deleteDriver, 
  updateDriver} = require('../controllers/driverController')

  router.delete('/driver/delete/:id', deleteDriver);
  router.put('/driver/update/:id', updateDriver);
  
module.exports = router;