const express = require('express')
const router = express.Router();
const viewBooking = require('../controllers/admin/viewBooking')

// mapping with controllers
router.post('/users/view-booking',viewBooking)


module.exports = router;