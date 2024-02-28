const Driver = require("../../../models/driverModel");
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });

    if (!driver || !await bcrypt.compare(password, driver.password)) {
      return res.status(401).json({ message: "Invalid email or password for driver" });
    }

    res.json({ message: "Driver Login successful", driver });
  } catch (error) {
    console.error("Error during driver login:", error);
    res.status(500).json({ message: "error from driverLogIn controller" });
  }
};

module.exports = {login};
