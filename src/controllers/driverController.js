const DriverService = require('../services/driverService');
const verifyJWT = require('../middleware/authMiddleware'); 

const updateAvailability = async (req, res) => {
  try {
    const driver = await DriverService.updateAvailability(req.params.id, req.body.availability);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json({ message: 'Availability updated successfully', driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while updating availability of driver' });
  }
};

const deleteDriver = async (req, res) => {
  try {
    verifyJWT(req, res, async () => { // Middleware check for valid JWT
      const deletedDriver = await DriverService.deleteDriver(req.params.id);
      if (!deletedDriver) {
        return res.status(404).json({ message: 'Driver not found' });
      }
      res.status(200).json({ message: 'Driver deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while deleting driver' });
  }
};

const login = async (req, res) => {
  try {
    const driver = await DriverService.login(req.body.phoneNumber, req.body.password);
    const driverResponse = {
      id: driver._id,
      name: driver.name,
      email: driver.email,
    };
    res.status(200).json({ message: 'Login successful', driver: driverResponse, token: driver.token });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Error in driver login' });
  }
};

const signup = async (req, res) => {
  try {
    const newDriver = await DriverService.signUp(req.body);
    const driverResponse = {
      id: newDriver._id,
      name: newDriver.name,
    };
    res.status(201).json({ message: 'Driver created successfully', driver: driverResponse });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Error creating driver' });
  }
};



module.exports = {
  updateAvailability,
  deleteDriver,
  signup,
  login
};
