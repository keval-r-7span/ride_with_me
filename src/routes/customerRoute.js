//App
const express = require('express')
const router = express.Router();

//Read Whole customer and read by id customer
const {getCustomer, getCustomerByID} = require('../controllers/customer/getCustomer')

//create User
const {createCustomer, loginCustomer} = require('../controllers/customer/createCustomer')

//update user
const updateCustomer = require('../controllers/customer/updateCustomer')

//delete user
const deleteCustomer = require('../controllers/customer/deleteCustomer')


// mapping with controllers
/////////////////////////////Create Operation//////////////////////////////////
router.post('/customer/register', createCustomer);

/////////////////////READ OPERATIONS///////////////////////////
router.get('/customer/view', getCustomer);
router.get('/customer/view/:id', getCustomerByID);

///////////////////////////UPDATE OPERATION////////////////////////////////////
router.put('/customer/update/:id', updateCustomer);

//////////////////////////DELETE OPERATION/////////////////////////////////
router.delete('/customer/delete/:id', deleteCustomer);

///////////////////////////////LOGIN////////////////////////////////////
router.post('/login', loginCustomer)

module.exports = router;