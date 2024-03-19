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
const validateRequest = (req, res, next) => {
  const { error } = driverJoiSchema.validate(req.body);
  if (error) {
      return res.status(400).json({error: error.details[0].message});
  }
  next();
};


const updateDriverSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(10).max(10),
  availability: Joi.string().valid('available', 'unavailable'),
  vehicleDetails: Joi.string()
});
const validateUpdateRequest = (req, res, next) => {
  const { error } = updateDriverSchema.validate(req.body);
  if (error) {
      return res.status(400).json({error: error.details[0].message});
  }
  next();
};


module.exports = validateRequest;
module.exports = validateUpdateRequest;
