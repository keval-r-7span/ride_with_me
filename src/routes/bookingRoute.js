const express = require("express");
const router = express.Router();

const { 
  viewBooking,
  viewBookingById,
  createBooking,
  cancelBooking,
  changeRideStatus } = require("../controllers/bookingController")

const {verifyToken, 
       isAdmin,
       isDriver, 
       isUser} = require('../middleware/authMiddleware')

  
router.get("/booking", viewBooking);
router.get("/booking/:id", viewBookingById);
router.delete("/booking/:id/cancel", cancelBooking);
router.post("/booking/create",verifyToken, isUser,createBooking)
router.post("/booking/:id/completed",verifyToken, isDriver,changeRideStatus)


module.exports = router;
