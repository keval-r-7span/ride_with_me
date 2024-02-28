const Driver = require("../../../models/driverModel");
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, vehicle, availabilityStatus, currentLocation, password } = req.body;

    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);

    const newDriver = new Driver({
      name,
      email,
      phoneNumber,
      vehicle,
      availabilityStatus,
      currentLocation,
      password: hashedPassword
    });

    await newDriver.save();

    res.status(201).json({ message: 'Driver created successfully', driver: newDriver });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {signup};
