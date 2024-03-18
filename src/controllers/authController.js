const { trueResponse, falseResponse } = require("../configs/responseMes");
const customerService = require("../services/userService");
const CustomerSchema = require("../models/customerModel");
const bcrypt = require("bcryptjs");
const jwtToken = require("../validator/jwtToken");
const { JWT } = require("../helper/constants");
const logger = require("../configs/mailTransport");

const signUp = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    const userExist = await customerService.findCustomer({ email });
    // console.log(userExist);
    logger.info(userExist);
    if (userExist) {
      throw new Error("User Already exist with same Email: " + { email });
    }
    if (role !== "admin") {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await customerService.registerUser({
        name,
        email: email.toLowerCase(),
        phoneNumber,
        password: hashedPassword,
        role,
      });
      await response.save();
      return trueResponse(res, response);
    } else {
      return res.status(400).json({
        success: false,
        message: "Enter valid role",
      });
    }
  } catch (error) {
    return falseResponse(res, error);
  }
};

// const resetPassword = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const existNumber = await customerService.findCustomer({ phoneNumber });
//     if (!existNumber) {
//       console.log("Please Register first");
//     } else {
//       //sendotp
//       //verifyotp
//       const newHashedPassword = await bcrypt.hash(password, 10);
//       const updatePassword = await customerService.newPassword(
//         { password: hashedPassword },
//         { $set: { password: newHashedPassword } }
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return falseResponse(res);
    }
    let registeredUser = await customerService.findCustomer({ phoneNumber });
    if (!registeredUser) {
      return falseResponse(res);
    } else {
      const ismatch = bcrypt.compare(password, registeredUser.password);
      if (ismatch) {
        const token = jwtToken.generateAccessToken(registeredUser);
        console.log(registeredUser);
        registeredUser.token = token;
        res.cookie("token", token, { httpOnly: true }).json({
          success: true,
          registeredUser,
          message: "User Logged in successfully",
        });
      } else {
        return falseResponse(res);
      }
    }
  } catch (error) {
    return falseResponse(res, error);
  }
};

// const forgotPassword = async (req, res, next) => {
//   const {email} = req.body
//   //Get USer based on email
//   const user = await customerService.findCustomer({email})
//   if(!user){
//     console.log("email Doesn't exist");
//     next()
//   }
//   //generate random reset token and save it in db
//   const resetToken = user.createPasswordToken()
//   console.log("resetToken");
//   await CustomerSchema.save()
//   //Send token back to user email
// }

// exports.resetPassword = (req, res, next) => {
// }

module.exports = {
  signUp,
  login,
  // forgotPassword
  // resetPassword
};
