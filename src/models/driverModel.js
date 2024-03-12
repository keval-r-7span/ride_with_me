const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  vehicleDetails: {
    type: String,
    model: { type: String },
    year: { type: Number },
    licensePlate: { type: String },
  },
  availability: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'unavailable'
  },
  password: {
    type: String
  },
  role:{
    type: String,
    enum: ["admin", "driver", "user"],
    default: "driver"
  },
  token: {
    type: String,
  }
});

module.exports =  mongoose.model("Driver", driverSchema)
