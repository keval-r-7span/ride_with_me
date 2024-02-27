//App
const express = require('express')
const router = express.Router();

//Read Whole customer and read by id customer
const {getCustomer, getCustomerByID} = require('../controllers/customer/getCustomer')

//create User
const createCustomer = require('../controllers/customer/createCustomer')

//update user
const updateCustomer = require('../controllers/customer/updateCustomer')

//delete user
const deleteCustomer = require('../controllers/customer/deleteCustomer')


// mapping with controllers
/////////////////////////////Create Operation//////////////////////////////////
router.post('/users/register-customer', createCustomer);

/////////////////////READ OPERATIONS///////////////////////////
router.get('/users/view-customer', getCustomer);
router.get('/users/view-customer/:id', getCustomerByID);

///////////////////////////UPDATE OPERATION////////////////////////////////////
router.put('/users/update-customer/:id', updateCustomer);

//////////////////////////DELETE OPERATION/////////////////////////////////
router.delete('/users/delete-customer/:id', deleteCustomer);

module.exports = router;