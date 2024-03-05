// this file include the picup and dropoff location of rider.


const Driver = require("../../models/driverBookingModel");

const driverViewLocation = async (req, res) => {
  try {
    const driverId = req.params.id;

    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({
      pickupLocation: driver.pickupLocation,
      destinationLocation: driver.dropoffLocation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error while retrieving driver locations' });
  }
};

module.exports = driverViewLocation;
