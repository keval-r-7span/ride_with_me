const jwt = require("jsonwebtoken");
const role = require("../helper/role")
const { JWT } = require("../helper/constants");
const customerService = require('../services/userService')
const CustomerSchema = require('../models/customerModel')

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "Token Missing",
      });
    }
    try {
      const decode = jwt.verify(token, JWT.SECRET, (err, decodeToken) => {
        if(err){
          console.log(err);
          return sendError("Error: Broken Or Expired Token");
        }
        if (!decodeToken.role) return sendError("Error: Role missing");
      })
      //verify token
      // const payload = jwt.verify(token, JWT.SECRET);
      // const decode = jwt.verify(token, JWT.SECRET);
      // if(role[payload.role].find(function(url){ 
      //   return url==req.baseUrl}
      //   ))
      //   {req.user=payload
      //   next();  
      //   }
    } catch (error) {
      return res.json({
        success: false,
        message: "invalid Token " + error,
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "There was error in verification " + error,
    });
  }
};



// exports.isDriver = (req, res, next) => {
//   try {
//     if (req.user.role !== "driver") {
//       return res.json({
//         success: false,
//         message: "Proected route for driver only",
//       });
//     }
//     next();
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "Something went wrong in student auth",
//     });
//   }
// };

// exports.isAdmin = (req, res, next) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.json({
//         success: false,
//         message: "Proected route for admin only",
//       });
//     }
//     next();
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "Something went wrong in student auth",
//     });
//   }
// };

// exports.isUser = (req, res, next) => {
//   try {
//     if (req.user.role !== "user") {
//       return res.json({
//         success: false,
//         message: "Proected route for user only",
//       });
//     }
//     next();
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "Something went wrong in student auth",
//     });
//   }
// };

// const forgotPassword = async (req, res, next) => {
//   const {email} = req.body
//   //Get USer based on email
//   const existEmail = await customerService.findCustomer({email})
//   if(!existEmail){
//     console.log("email Doesn't exist");
//     next(error)
//   }
//   //generate random reset token and save it in db
//   const resetToken = CustomerSchema.createPasswordToken()

//   await CustomerSchema.save()
//   //Send token back to user email 
// }

// exports.resetPassword = (req, res, next) => {
// }
