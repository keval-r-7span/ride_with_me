const express = require("express");
const router = express.Router();

const {
  viewBooking,
  viewBookingById,
  createBooking,
  cancelBooking,
  changeRideStatus,
  updateBooking,
  BookingStatus,
  paymentStatus,
} = require("../controllers/bookingController");

router.get("/booking", viewBooking);
router.get("/bookingstatus", BookingStatus);
router.get("/booking/:id", viewBookingById);
router.post("/booking/create", createBooking);
router.post("/booking/:id/completed", changeRideStatus);
router.put("/booking/update/:id", updateBooking);
router.post("/booking/payment/status/:id",paymentStatus)
router.delete("/booking/cancel/:id", cancelBooking);

module.exports = router;
