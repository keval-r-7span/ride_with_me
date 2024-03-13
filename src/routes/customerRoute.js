//App
const express = require('express')
const router = express.Router();
const { 
       deleteCustomer, 
       updateCustomer, 
       getCustomer, 
       getCustomerByID} = require('../controllers/customerController')
const {
       signUp,
       login} = require('../controllers/authController')
const {sendOTP, 
       verifyOtp} = require('../controllers/otpAuth')
const validateRequest = require('../validation/userValidation')

// mapping with controllers
router.post('/user/register',validateRequest, signUp);
router.post('/user/login', login)
router.get('/user/view', getCustomer);
router.get('/user/view/:id', getCustomerByID);
router.put('/user/update/:id', updateCustomer);
router.delete('/user/delete/:id', deleteCustomer);
router.post('/user/send-otp', sendOTP)
router.post('/user/verify-otp', verifyOtp)

module.exports = router;