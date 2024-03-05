const express = require("express");
const router = express.Router();

const signup  = require("../controllers/driver/driverSignUp");
const login  = require("../controllers/driver/driverLogIn");
const deleteDriver = require("../controllers/driver/driverDelete");
const updateAvailability = require("../controllers/driver/driverAvailability");
const verifyJWT = require('../middleware/authMiddleware');
// const updateLocation = require('../controllers/driver/driverUpdateLocation');
// const driverViewLocation = require('../controllers/driver/driverViewLocation');


router.post('/driver/signup', signup);
router.post('/driver/login', login);
router.put('/driver/availability/:id', verifyJWT, updateAvailability);
router.delete('/driver/delete/:id', verifyJWT, deleteDriver);
// router.post('/driver/location', updateLocation);  // to update driver location
// router.get('/driver/location', driverViewLocation);  // to view rider's location

module.exports = router;