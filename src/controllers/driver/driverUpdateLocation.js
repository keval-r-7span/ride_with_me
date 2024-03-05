// this file change location of driver

const Driver = require("../../models/driverBookingModel");

const updateLocation = async (req, res) => {
  try {
    const driverId = req.params.id; 
    const { latitude, longitude } = req.body; 

    if (!driverId || !latitude || !longitude) {
      return res.status(400).json({ message: 'Missing required fields (driverId, latitude, longitude)' });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      driverId,
      { currentLocation: { latitude, longitude } },
      { new: true } 
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Location updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error while updating driver location' });
  }
};

module.exports = updateLocation;