//App
const express = require('express')
const router = express.Router();
const { 
       deleteCustomer, 
       updateCustomer, 
       getCustomer, 
       getCustomerByID,} = require('../controllers/customerController')
const {signUp,
       login,
       forgotPassword} = require('../controllers/authController')
const {sendOTP, 
       verifyOtp} = require('../controllers/otpAuth')

const calcDistance = require('../helper/distance')

// const {verifyToken} = require('../middleware/authMiddleware')

const role = require('../helper/role')

// mapping with controllers
router.post('/user/register', signUp);
router.post('/user/login', login)
router.get('/user/view', getCustomer);
router.get('/user/view/:id', getCustomerByID);
router.put('/user/update/:id',updateCustomer);
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