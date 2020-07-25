const Joi = require('@hapi/joi');

const signUpValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    passcode: Joi.string().length(4).required(),
    avatar: Joi.string().min(2).required()
  });
  return schema.validate(data);
};

const signInValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    passcode: Joi.string().length(4).required()
  });
  return schema.validate(data);
};

module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;
