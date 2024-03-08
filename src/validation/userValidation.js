const Joi = require('joi');

const userJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().min(10).max(10).required() ,
  role: Joi.string().required(),
});

module.exports = userJoiSchema;