const express = require("express");
const router = express.Router();

const signup  = require("../controllers/driver/driverSignUp");
const login  = require("../controllers/driver/driverLogIn");
const deleteDriver = require("../controllers/driver/driverDelete");
const updateAvailability = require("../controllers/driver/driverAvailability");
const verifyJWT = require('../middleware/authMiddleware');


router.post('/driver/signup', signup);
router.post('/driver/login', login);
router.put('/driver/availability/:id', verifyJWT, updateAvailability);
router.delete('/driver/delete/:id', verifyJWT, deleteDriver);

module.exports = router;