const DriverService = require('../services/driverService');

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
    JWT(req, res, async () => { 
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


module.exports = {
  updateAvailability,
  deleteDriver
};
