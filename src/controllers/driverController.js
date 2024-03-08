const driverService = require('../services/driverService');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT} = require('../helper/constant');


exports.signUp = async (req, res) => {
    try {
        const {name,email,phoneNumber,vehicleDetails,availability,password,role,token} = req.body 
        const userExist = await driverService.findDriver({email}) 
        if (userExist)
        {
            throw new Error("User Already exist with same Email: " + { email });
        }
        if(role !== 'admin'){
            const hashedPassword = await bcrypt.hash(password, 10);
            const response = await driverService.registerUser({
                name,
                email: email.toLowerCase(),
                phoneNumber,
                vehicleDetails,availability,
                password: hashedPassword,
                role
            })
            await response.save();
            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: response
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Enter valid role",
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in signUp " + error,
        })
    }
}
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(500).json({
                success: false,
                message: "Please enter proper info! "
            })
        }
        let registeredUser = await driverService.findDriver({email})
        if(!registeredUser){
            return res.json({
                success: false,
                message: "Please Register First"
            })
        }    
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Error in login " +error
        })
    }
};

exports.updateDriver = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, phoneNumber, vehicleDetails, updateAvailability, password, role} = req.body
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

