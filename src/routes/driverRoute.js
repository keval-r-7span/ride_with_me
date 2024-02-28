const express = require('express');
const router = express.Router();

const  {login}  = require('../controllers/driver/Auth/driverLogIn'); 
const  {signup}  = require('../controllers/driver/Auth/driverSignUp');
// const  {handleBooking}  = require('../controllers/driver/Booking/driverBooking'); 
router.post('/driverLogIn', login);
router.post('/driverSignUp', signup);
// router.post('/driverBooking', handleBooking);

module.exports = router;
