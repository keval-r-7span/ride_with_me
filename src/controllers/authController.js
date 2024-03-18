const driverService = require("../services/driverService");
const driverJoiSchema = require("../validation/driverValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT } = require("../helper/constants");

const driverSignUp = async (req, res) => {
  try {
    const { name,email,phoneNumber,vehicleDetails,password,role } = req.body;
    const userExist = await driverService.findDriver({ email });
    if (userExist) {
      throw new Error("User Already exist with same Email");
    }
    if (role !== "driver" && role === " ") {
      return res.status(400).json({
        success: false,
        message: "Enter valid role",
      });
    }
    const { error } = driverJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
          sucess:false, 
          message: error.details[0].message 
      });
    }
      else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await driverService.registerUser({
          name,
          email: email.toLowerCase(),
          phoneNumber,
          vehicleDetails,
          password : hashedPassword ,
          role
        });
          await response.save();
          return res.status(200).json({
            success: true,
            data: response,
            message: "User created successfully",
          });
      }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in signUp " + error,
    });
  }
};

const driverLogin = async (req, res) => {
try {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(500).json({
      success: false,
      message: "Please enter proper info! ",
    });
  }

  const registeredUser = await driverService.findDriver({ phoneNumber });
  if (!registeredUser) {
    return res.json({
      success: false,
      message: "Please Register First",
    });
  } else {
    return res.json({
      success: true,
      message: "User is successfully logged in",
    });
  }
} catch (error) {
  res.status(500).json({
    success: false,
    message: "Error in login " + error,
  });
}
};

module.exports = {
  driverSignUp,
  driverLogin
};
