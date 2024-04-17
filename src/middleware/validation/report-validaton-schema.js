const Joi = require('joi');

const reportedPlaceValidationSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  // category_img: req.body에서 받아온 category로 service에서 category_img 이미지 컬렉션에서 찾아서 저장
  vegan_option: Joi.boolean().required(),
  tel: Joi.string()
    .allow('')
    .pattern(
      /^(\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4}|\d{4}-\d{4}-\d{4}|\d{2}-\d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
    )
    .default(''),
  address: Joi.string().required(),
  address_lot_number: Joi.string().required(),
  address_detail: Joi.string().allow('').default(''),
  location: Joi.array()
    .items(
      Joi.number().min(-180).max(180), // 경도
      Joi.number().min(-90).max(90), // 위도
    )
    .length(2)
    .required(),
  open_times: Joi.array().items(Joi.string()).default([]),
  sns_url: Joi.string().allow(''), // string으로 받아서 배열로 저장
  // user_id: 토큰으로 사용자 ID 저장
});

module.exports = reportedPlaceValidationSchema;
