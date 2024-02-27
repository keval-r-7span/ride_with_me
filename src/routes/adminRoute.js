const express = require('express')
const router = express.Router();
const View_BookingController = require('../controllers/admin/booking/viewBooking')

// mapping with get-controllers
router.get('/booking/view-booking',View_BookingController)

// mapping with post-controllers


module.exports = router;