const Joi = require('joi');

const reviewValidationSchema = Joi.object({
  place_id: Joi.string().required(),
  content: Joi.string().required(),
  // author: 토큰으로 user 정보 받아와서 service에서 저장
  // author_tag: 토큰으로 user 정보 받아와서 service에서 저장
});

module.exports = reviewValidationSchema;
