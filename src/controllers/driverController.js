const driverService = require('../services/driverService');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const driverJoiSchema = require("../validation/driverValidation");
const updateDriverJoiSchema = require("../validation/driverValidation");
const {JWT} = require('../helper/constant');

exports.signUp = async (req, res) => {
    try {
      const { name,email,phoneNumber,vehicleDetails,password,role,token } = req.body;
      const userExist = await driverService.findDriver({ email });
      if (userExist) {
        throw new Error("User Already exist with same Email");
      }
      if (role !== "driver") {
        return res.status(400).json({
          success: false,
          message: "Enter valid role",
        });
      }
      const { error, value } =driverJoiSchema.validate(req.body);
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
            password: hashedPassword,
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
  
exports.login = async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      if (!phoneNumber || !password) {
        return res.status(500).json({
          success: false,
          message: "Please enter proper info! ",
        });
      }
      let registeredUser = await driverService.findDriver({ phoneNumber });

      if (!registeredUser) {
        return res.json({
          success: false,
          message: "Please Register First",
        }); 
      }else {
        return res.json({
            success: true,
            message: "User is successfully logged in",
            user: {
                name: registeredUser.name,
                email: registeredUser.email
            }
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in login " + error,
      });
    }
};






exports.updateDriver = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, phoneNumber, vehicleDetails, availability, password, role} = req.body;
      const { error, value } = updateDriverJoiSchema.validate(req.body, { allowUnknown: true });

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }

      const response = await driverService.updateDriver(
          {_id: id},
          req.body ,
          {new:true }
      )
      return res.status(200).json({
          success: true,
          data: response,
          message: "driver details updated Successfully"
      })      
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Cannot find ID to update : "+error
      })
  }
};






exports.deleteDriver = async (req, res) => {
  try {
      const {id} = req.params
      const response = await driverService.deleteDriver(id);
      return res.status(200).json({
        success: true,
        data: response,
        message: "Driver deleted successfully!"
      })
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Error while deleting driver "+error
      })
  }
};

exports.availableDrivers = async (req, res, next) => {
    try {
        const availableDrivers = await driverService.availableDrivers();
        res.status(200).json({ 
            success: true,
            drivers: availableDrivers 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch available drivers" 
        });
    }
};
