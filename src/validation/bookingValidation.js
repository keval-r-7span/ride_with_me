const Joi = require("joi");

const bookingJoiSchema = Joi.object({
  pickupLocation: Joi.string().min(3).max(100).required(),
  dropoffLocation: Joi.string().min(3).max(100).required(),
  pickupTime: Joi.string().required().default(Date.now()),
  status: Joi.string().default("pending"),
  fare: Joi.number().required(),
  rating: Joi.number(),
  payment_status:Joi.string().default("pending"),
  comments: Joi.string().default("Good Experience"),
});

module.exports = bookingJoiSchema;
