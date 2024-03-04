const express = require("express");
const router = express.Router();
const {
  View_BookingController,
  View_BookingByIdController,
} = require("../controllers/admin/booking/viewBooking");
const cancel_BookingController = require("../controllers/admin/booking/cancelBooking");
const create_BookingController = require("../controllers/admin/booking/createBooking")
const rideBooking_Complete = require("../controllers/admin/booking/bookingStatus")


// mapping with get-controllers
router.get("/admin/bookings", View_BookingController);
router.get("/admin/booking/:id", View_BookingByIdController);
router.delete("/admin/booking/:id/cancel", cancel_BookingController);
router.post("/admin/booking/create",create_BookingController)
router.post("/admin/booking/:id/completed",rideBooking_Complete)

module.exports = router;
