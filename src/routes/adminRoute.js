const express = require('express')
const router = express.Router();
const {View_BookingController,View_BookingByIdController} = require('../controllers/admin/booking/viewBooking')

// mapping with get-controllers
router.get('/booking/view-booking',View_BookingController)
router.get('/booking/view-booking/:id',View_BookingByIdController)
// mapping with post-controllers

module.exports = router;