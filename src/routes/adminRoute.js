const express = require('express')
const router = express.Router();
const view_booking = require('../controllers/admin/view-booking')

// mapping with controllers
router.post('/users/view-booking',view_booking)


module.exports = router;