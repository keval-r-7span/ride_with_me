const express = require('express')
const router = express.Router();

const {getCustomer, getCustomerByID} = require('../controllers/customer/getCustomer')
const {createCustomer, loginCustomer} = require('../controllers/customer/createCustomer')
const updateCustomer = require('../controllers/customer/updateCustomer')
const deleteCustomer = require('../controllers/customer/deleteCustomer')

router.post('/customer/register', createCustomer);
router.get('/customer/view', getCustomer);
router.get('/customer/view/:id', getCustomerByID);
router.put('/customer/update/:id', updateCustomer);
router.delete('/customer/delete/:id', deleteCustomer);
router.post('/login', loginCustomer)

module.exports = router;