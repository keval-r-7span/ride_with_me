const Driver = require("../models/driverModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const updateAvailability = async (driverId, availability) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      driverId,
      { availability },
      { new: true }
    );
    return updatedDriver;
  } catch (error) {
    throw error; // Re-throw the error for handling in the controller
  }
};

const deleteDriver = async (driverId) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(driverId);
    return deletedDriver;
  } catch (error) {
    throw error; // Re-throw the error for handling in the controller
  }
};

const login = async (phoneNumber, password) => {
  try {
    const driver = await Driver.findOne({ phoneNumber });
    if (!driver) {
      throw new Error('Invalid phone number or password', { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      throw new Error('Invalid phone number or password', { status: 401 });
    }

    const payload = { id: driver._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    driver.token = token; // Add token to the driver object (optional)
    return driver;
  } catch (error) {
    throw error; // Re-throw the error for handling in the controller
  }
};

const signUp = async (driverData) => {
  try {
    const existingDriver = await Driver.findOne({ phoneNumber: driverData.phoneNumber });
    if (existingDriver) {
      throw new Error('Driver already exists with this phone number', { status: 400 });
    }

    const saltRounds = 10; // Adjust this value as needed
    const hashedPassword = await bcrypt.hash(driverData.password, saltRounds);

    driverData.password = hashedPassword;

    const newDriver = new Driver(driverData);
    await newDriver.save();

    return newDriver;
  } catch (error) {
    throw error; // Re-throw the error for handling in the controller
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
  deleteDriver,
  // updateLocation,
  signUp,
  login
};
