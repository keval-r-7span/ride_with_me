const Driver = require("../../models/driverModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const driver = await Driver.findOne({ phoneNumber });
    if (!driver) {
      return res.status(401).json({ message: 'Invalid phoneNumber or password' });
    }

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Generate JWT (implement error handling for JWT generation)
    const payload = { id: driver._id }; // Include driver ID as a claim
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    const driverResponse = {
      id: driver._id,
      name: driver.name,
      email: driver.email
    };

    res.status(200).json({ message: 'Login successful', driver: driverResponse, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error in driver login' });
  }
};

module.exports = login;
