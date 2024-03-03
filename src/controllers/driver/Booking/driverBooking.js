// const Driver = require('../../../models/driverModel');

// const updateLocation = async (req, res) => {
//   try {
//     const { id, coordinates } = req.body;

//     // Update the live location
//     await Driver.findByIdAndUpdate(id, { currentLocation: coordinates });
//     res.json({ message: 'Live location of driver updated' });
//   } catch (error) {
//     console.error('Error updating live location of driver:', error);
//     res.status(500).json({ message: 'update location error from driverBooking file from controller' });
//   }
// };

// const viewBookingRequests = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const bookingRequests = await Request.find({ assignedDriver: id, status: 'pending' });
//     res.json(bookingRequests);
//   } catch (error) {
//     console.error('Error fetching booking requests:', error);
//     res.status(500).json({ message: 'view booking error from driverBooking file from controller' });
//   }
// };

// const acceptBookingRequest = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await Request.findByIdAndUpdate(id, { status: 'accepted' });
//     res.json({ message: 'Booking request accepted' });
//   } catch (error) {
//     console.error('Error accepting booking request:', error);
//     res.status(500).json({ message: 'error from driverBooking file from controller' });
//   }
// };

// const rejectBookingRequest = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await Request.findByIdAndUpdate(id, { status: 'rejected' });
//     res.json({ message: 'Booking request rejected' });
//   } catch (error) {
//     console.error('Error rejecting booking request:', error);
//     res.status(500).json({ message: 'error from driverBooking file from controller' });
//   }
// };

// module.exports = {
//   updateAvailability,
//   updateLocation,
//   viewBookingRequests,
//   acceptBookingRequest,
//   rejectBookingRequest
// };
