const Joi = require("joi");

const driverJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  availability: Joi.string().valid("available", "unavailable"),
  password: Joi.string().min(3).required(),
  role: Joi.string().default("driver"),
});
const validateRequest = (req, res, next) => {
  const { error } = driverJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//vehicle details validation
const addVehicle = Joi.object({
  manufacturer: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.string().min(4).max(4).required(),
  licensePlate: Joi.string().required(),
  color: Joi.string(),
  vehicleClass: Joi.string()
    .valid("Bike", "Rickshaw", "Hatchback", "Sedan", "Suv", "VIP")
    .required(),
  baseFare: Joi.number().required(),
  driverId: Joi.string().required(),
});
const validtaeAddVehicle = (req, res, next) => {
  const { error } = addVehicle.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateRequest, validtaeAddVehicle };
