const express = require("express");
const router = express.Router();

const signup  = require("../controllers/driver/driverSignUp");
const login  = require("../controllers/driver/driverLogIn");
const deleteDriver = require("../controllers/driver/driverDelete");
const updateAvailability = require("../controllers/driver/driverAvailability");
const verifyJWT = require('../middleware/authMiddleware');


router.post("../controllers/driver/driverSignUp.js", signup);
router.post("../controllers/driver/driverLogIn.js", login);
router.put("/:id/availability", verifyJWT, updateAvailability);
router.delete("/:id", verifyJWT, deleteDriver);

module.exports = router;
