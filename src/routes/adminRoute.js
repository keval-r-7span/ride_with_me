const express = require("express");
const router = express.Router();
const {
  View_BookingController,
  View_BookingByIdController,
} = require("../controllers/admin/booking/viewBooking");
const cancel_BookingController = require("../controllers/admin/booking/cancelBooking");

// mapping with get-controllers
router.get("/admin/bookings", View_BookingController);
router.get("/admin/booking/:id", View_BookingByIdController);
router.delete("/admin/booking/:id/cancel", cancel_BookingController);

module.exports = router;
