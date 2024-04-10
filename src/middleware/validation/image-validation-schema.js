const Joi = require('joi');

const imageValidationSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.object({
      basic_url: Joi.string().required(),
      pin_url: Joi.string().optional(),
    }).required(),
  });

module.exports = imageValidationSchema;