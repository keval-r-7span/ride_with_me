//App
const express = require("express");
const router = express.Router();
const {
  deleteCustomer,
  updateCustomer,
  getCustomer,
  getCustomerByID,
} = require("../controllers/customerController");
const {
  signUp,
  login,
  resetPasswordToken,
  resetPassword,
} = require("../controllers/authController");
const { sendOtp, verifyOtp } = require("../controllers/otpAuth");
const validateRequest = require("../validation/userValidation");
const calcDistance = require("../helper/distance");
const { verifyToken } = require("../middleware/authMiddleware");

// mapping with controllers
router.post("/user/register", validateRequest, signUp);
router.post("/user/login", login);
router.get("/user/view", getCustomer);
router.get("/user/view/:id", getCustomerByID);
router.put("/user/update/:id", verifyToken, updateCustomer);
router.delete("/user/delete/:id", deleteCustomer);
router.post("/user/send-otp", sendOtp);
router.post("/user/verify-otp", verifyOtp);
router.post("/user/reset-password-token", resetPasswordToken);
router.post("/user/reset-password", resetPassword);
//calc distance
router.get("/maps/distance", calcDistance);

module.exports = router;
