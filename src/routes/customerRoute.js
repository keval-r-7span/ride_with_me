//App
const express = require('express')
const router = express.Router();

//Read Whole customer
const getCustomer = require('../controllers/customer/getCustomer')

//create User
const createCustomer = require('../controllers/customer/createCustomer')

// mapping with controllers
router.post('/registration', createCustomer)
router.get('/customer', getCustomer)

module.exports = router;