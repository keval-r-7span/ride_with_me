const mongoose = require('mongoose');

const rideBookingSchema = new mongoose.Schema({
  currentLocation: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [
      { type: Number }
    ]
  },
  pickupLocation: {
    type: { type: String, default: "Point" }, 
    coordinates: [Number], 
    required: true
  },
  destinationLocation: {
    type: { type: String, default: "Point" }, 
    coordinates: [Number],
    required: true
  },
  rideStatus: {
    type: String,
    enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'pending'
  }
});

const RideBooking = mongoose.model('RideBooking', rideBookingSchema);

module.exports = RideBooking;
