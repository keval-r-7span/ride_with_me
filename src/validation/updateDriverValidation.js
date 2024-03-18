const Joi = require("joi");

const updateDriverJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  availability: Joi.string().valid('available', 'unavailable'),
  vehicleDetails: Joi.string(),
});

// module.exports = updateDriverJoiSchema;
const validateUpdate = (req, res, next) => {
  const { error } = updateDriverJoiSchema.validate(req.body);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateUpdate;