const express = require("express");
const router = express.Router();
const validateRequest = require("../validation/bookingValidation");
const {
  viewBooking,
  viewBookingById,
  createBooking,
  cancelBooking,
  changeRideStatus,
  updateBooking,
  BookingStatus,
  paymentStatus,
  getRevenue,
  totalBooking,
} = require("../controllers/bookingController");

router.get("/all", viewBooking);
router.get("/status", BookingStatus);
router.get("/:id", viewBookingById);
router.get("/revenue/total", getRevenue);
router.get("/monthly/total",totalBooking)
router.post("/create", validateRequest, createBooking);
router.post("/:id/completed", changeRideStatus);
router.put("/update/:id", updateBooking);
router.post("/payment/status/:id", paymentStatus);
router.delete("/cancel/:id", cancelBooking);

module.exports = router;
