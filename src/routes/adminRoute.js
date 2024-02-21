const express = require('express')
const router = express.Router();
const viewBooking = require('../controllers/admin/booking/viewBooking')

// mapping with controllers
router.post('/users/view-booking',viewBooking)


module.exports = router;