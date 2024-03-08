const mongoose = require('mongoose');
const Joi = require("joi");

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
    // required: true
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
  },
  token: {
    type: String,
  }
});

const Driver = mongoose.model('Driver', driverSchema);

// joi Schema validation
const driverJoiSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().min(5).max(10).required(),
  password: Joi.string().min(4).max(12).required(),
});

module.exports = {
  Driver: Driver,
  validatedriver:(user)=>driverJoiSchema.validate(user)
};