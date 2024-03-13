const Joi = require("joi");

const driverJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  availability: Joi.string(),
  vehicleDetails: Joi.string(),
  password: Joi.string().min(3).required(),
  role: Joi.string().default("driver"),
});

// const updateDriverJoiSchema = Joi.object({
//     name: Joi.string().min(3).max(30),
//     email: Joi.string().email(),
//     phoneNumber: Joi.string().min(10).max(10),
//     vehicleDetails : Joi.string(),
//     availability: Joi.string().valid('available', 'unavailable'),
//     password: Joi.string().min(3),
//     role: Joi.string().default("driver")
// }).min(1);

module.exports = driverJoiSchema;
// module.exports = updateDriverJoiSchema;
