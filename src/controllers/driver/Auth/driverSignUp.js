const Driver = require("../../../models/driverModel");
const bcrypt = require('bcryptjs');

console.log("djh");

const signUp = async (req, res) => {
  try {
    const { name, email, phoneNumber, vehicle, availabilityStatus, currentLocation, password } = req.body;
    console.log("hy");

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

    console.log("hdgy");
    await newDriver.save();

    res.status(201).json({ message: 'Driver created successfully', driver: newDriver });
  }
   catch (error) {
    res.status(500).send('Error in Sign Up' + error);
  }
};

module.exports = signUp;
