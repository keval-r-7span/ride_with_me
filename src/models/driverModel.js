const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  phoneNumber: {
    type: String,
    // required: true
  },
  vehicle: {
    type: String,
    // required: true
  },
  availabilityStatus: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'] 
    },
    coordinates: [
      { type: Number } 
    ]
  },
  password: {
    type: String,
    // required: true
  }
});


module.exports = mongoose.model('Driver', driverSchema);
