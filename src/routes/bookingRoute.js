const express = require("express");
const router = express.Router();

const { 
  viewBooking,
  viewBookingById,
  createBooking,
  cancelBooking,
  changeRideStatus, 
  updateBooking} = require("../controllers/bookingController")



router.get("/booking", viewBooking);
router.get("/booking/:id", viewBookingById);
router.post("/booking/create",createBooking)
router.post("/booking/:id/completed",changeRideStatus)
router.put("/booking/:id/update",updateBooking)
router.delete("/booking/:id/cancel", cancelBooking);


module.exports = router;
