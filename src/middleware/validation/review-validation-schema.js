const Joi = require('joi');

const reviewValidationSchema = Joi.object({
  place_id: Joi.string().required(),
  content: Joi.string().allow('').required(),
  // user_id: 토큰으로 controller에서 저장
});

const patchReviewValidationSchema = Joi.object({
  content: Joi.string().required(),
});

module.exports = { reviewValidationSchema, patchReviewValidationSchema };
