const driverService = require("../services/driverService");
const vehicleService = require("../services/vehicleService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT } = require("../helper/constants");

exports.signUp = async (req, res) => {
  try {
    const { name, email, phoneNumber, vehicleDetails, password, role, token } =
      req.body;
    const userExist = await driverService.findDriver({ email });
    if (userExist) {
      throw new Error("User Already exist with same Email");
    }
    if (role !== "driver" && role == "") {
      return res.status(400).json({
        success: false,
        message: "check your role",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await driverService.registerUser({
      name,
      email: email.toLowerCase(),
      phoneNumber,
      vehicleDetails,
      password: hashedPassword,
      role,
    });
    await response.save();
    return res.status(200).json({
      success: true,
      data: response,
      message: "User created successfully",
    });
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

exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, availability, vehicleDetails } = req.body;
    const response = await driverService.updateDriver(
      { _id: id },
      { name, phoneNumber, availability, vehicleDetails }
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "driver details updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot find ID to update : " + error,
    });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await driverService.deleteDriver(id);
    return res.status(200).json({
      success: true,
      data: response,
      message: "Driver deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting driver " + error,
    });
  }
};

exports.availableDrivers = async (req, res, next) => {
  try {
    const availableDrivers = await driverService.availableDrivers();
    res.status(200).json({
      success: true,
      drivers: availableDrivers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch available drivers",
    });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const { manufacturer, model, year, licensePlate, color, vehicleClass, driverId } = req.body;
    const vehicleExist = await vehicleService.findVehicle({ licensePlate });
    if (vehicleExist) {
      throw new Error("vehicle Already exist with same licensePlate");
    }
    const response = await vehicleService.addVehicle({ manufacturer, model, year, licensePlate, color, vehicleClass, driverId });
    await response.save();
    return res.status(200).json({
      success: true,
      data: response,
      message: "vehicle added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while addind vehicle " + error,
    });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { manufacturer, model, year, licensePlate, color, vehicleClass } =
      req.body;
    const response = await vehicleService.updateVehicleDetails(
      { _id: id },
      { manufacturer, model, year, licensePlate, color, vehicleClass }
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "vehicle details updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot find ID to update vehicle data : " + error,
    });
  }
};
