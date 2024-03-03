const Driver = require("../../models/driverModel");

const updateAvailability = async (req, res) => {
  try {
    const driverId = req.params.id; 
    const { availability } = req.body; 

    const updatedDriver = await Driver.findByIdAndUpdate(
      driverId,
      { availability },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Availability updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error while updating availability of driver' });
  }
};

module.exports = updateAvailability;
