const Driver = require("../models/driverModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const updateAvailability = async (driverId) => {
  try {
    const currentDriver = await Driver.findById(driverId);
    if (!currentDriver) {
      throw new Error("Driver not found");
    }
    const updatedAvailability = currentDriver.availability === "available" ? "unavailable" : "available";
    const updatedDriver = await Driver.findByIdAndUpdate(
      driverId,
      { availability: updatedAvailability },
      { new: true } 
    );
    return updatedDriver;
  } catch (error) {
    throw error;
  }
};

const deleteDriver = async (driverId) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(driverId);
    return deletedDriver;
  } catch (error) {
    throw error; 
  }
};


// const updateLocation = async (driverId, latitude, longitude) => {
//   try {
//     if (!driverId || !latitude || !longitude) {
//       throw new Error('Missing required fields (driverId, latitude, longitude)', { status: 400 });
//     }

//     const updatedDriver = await Driver.findByIdAndUpdate(
//       driverId,
//       { currentLocation: { latitude, longitude } },
//       { new: true }
//     );

//     return updatedDriver;
//   } catch (error) {
//     throw error; // Re-throw the error for handling in the controller
//   }
// };

module.exports = {
  updateAvailability,
  deleteDriver
  // updateLocation,
};
