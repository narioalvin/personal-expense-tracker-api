const Joi = require('@hapi/joi');

const validation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    passcode: Joi.string().length(4).required(),
  });
  return schema.validate(data);
};

module.exports.validation = validation;
