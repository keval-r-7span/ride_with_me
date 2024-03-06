const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicle: {
    type: String,
    required: true
  },
  vehicleDetails: {
    id : String,
    model: { type: String },
    year: { type: Number },
    licensePlate: { type: String }
  },
  updateAvailability: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'unavailable'
  },
  password: {
    type: String,
    required: true
  },
  Role:{
    type: String,
    enum: ["admin", "driver", "user"],
    default: "driver"
  }
});

module.exports = mongoose.model('Driver', driverSchema);
