const Joi = require('joi');

const reportedPlaceValidationSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  // category_img: req.body에서 받아온 category로 service에서 category_img 이미지 컬렉션에서 찾아서 저장
  vegan_option: Joi.boolean().required(),
  tel: Joi.string().default(''),
  address: Joi.string().required(),
  address_lot_number: Joi.string().required(),
  address_detail: Joi.string().default(''),
  location: Joi.array()
    .items(
      Joi.number().min(-180).max(180), // 경도
      Joi.number().min(-90).max(90), // 위도
    )
    .length(2)
    .required(),
  open_times: Joi.array().items(Joi.string()).default([]),
  sns_url: Joi.array().items(Joi.string()).default([]),
  // user_id: 토큰으로 사용자 ID 저장
});

module.exports = reportedPlaceValidationSchema;
