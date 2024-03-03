const Driver = require("../../models/driverModel");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

    const driverResponse = {
      id: newDriver._id,
      name: newDriver.name
    };

    res.status(201).json({ message: 'Driver created successfully', driver: driverResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error while creating driver id' });
  }
};

module.exports = signUp;
