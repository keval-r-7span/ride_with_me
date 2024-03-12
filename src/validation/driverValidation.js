const Joi = require('joi');

const driverJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  vehicleDetails : Joi.string(),
  password: Joi.string().min(3).required(),
  role: Joi.string().required(),
});

module.exports = driverJoiSchema;