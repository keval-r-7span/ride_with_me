const express = require("express");
const router = express.Router();

const { 
  viewBooking,
  viewBookingById,
  createBooking,
  cancelBooking,
  changeRideStatus } = require("../controllers/bookingController")

  
router.get("/booking", viewBooking);
router.get("/booking/:id", viewBookingById);
router.delete("/booking/:id/cancel", cancelBooking);
router.post("/booking/create",createBooking)
router.post("/booking/:id/completed",changeRideStatus)


module.exports = router;
