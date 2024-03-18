//App
const express = require('express')
const router = express.Router();
const { 
       deleteCustomer, 
       updateCustomer, 
       getCustomer, 
       getCustomerByID,} = require('../controllers/customerController')
const {signUp,
       login} = require('../controllers/authController')
const {sendOTP, 
       verifyOtp} = require('../controllers/otpAuth')
const validateRequest = require('../validation/userValidation')

const calcDistance = require('../helper/distance')

const {verifyToken} = require('../middleware/authMiddleware')

// const role = require('../helper/role')

// mapping with controllers
router.post('/user/register',validateRequest, signUp);
router.post('/user/login', login)
router.get('/user/view', getCustomer);
router.get('/user/view/:id', getCustomerByID);
router.put('/user/update/:id', verifyToken,updateCustomer);
router.delete('/user/delete/:id',deleteCustomer);
router.post('/user/send-otp' ,sendOTP)
router.post('/user/verify-otp', verifyOtp)
//forgot password
// router.post('/forgot/password', forgotPassword)
//calc distance 
router.get('/maps/distance', calcDistance)

module.exports = router;

// app.post('/',auth,(req,res,next) => {
//        res.status(200).send("flight rescheduled");
//        })