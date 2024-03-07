const mongoose = require('mongoose');

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
  vehicleDetails: {
    id : String,
    type: String,
    model: { type: String },
    year: { type: Number },
    licensePlate: { type: String },
    required: true
  },
  availability: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'unavailable'
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ["admin", "driver", "user"],
    default: "driver"
  }
});

module.exports = mongoose.model('Driver', driverSchema);
