const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const studentSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  dateOfBirth: Joi.date().required(),
  class: Joi.string().min(1).required(),
  guardianName: Joi.string().min(1).optional().allow(null),
  guardianContact: Joi.string().min(1).optional().allow(null)
});


module.exports = { userSchema,studentSchema };
