//App
const express = require('express')
const router = express.Router();
const { 
       deleteCustomer, 
       updateCustomer, 
       getCustomer, 
       getCustomerByID} = require('../controllers/customerController')
const {
       registerCustomer,
       loginCustomer} = require('../controllers/authController')
const {sendOTP, 
       verifyOtp} = require('../controllers/otpAuth')

const calcDistance = require('../helper/distance')

// mapping with controllers
router.post('/user/register', registerCustomer);
router.get('/user/view', getCustomer);
router.get('/user/view/:id', getCustomerByID);
router.put('/user/update/:id', updateCustomer);
router.delete('/user/delete/:id', deleteCustomer);
router.post('/user/login', loginCustomer)
router.post('/user/send-otp', sendOTP)
router.post('/user/verify-otp', verifyOtp)

//calc distance 
router.get('/distance', calcDistance)

module.exports = router;