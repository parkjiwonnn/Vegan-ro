const Joi = require('joi');

const placeValidationSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  // category_img: req.body에서 받아온 category로 service에서 category_img 이미지 컬렉션에서 찾아서 저장
  vegan_option: Joi.boolean().required(),
  tel: Joi.string().allow('').default(''),
  address: Joi.string().required(),
  address_lot_number: Joi.string().required(),
  address_detail: Joi.string().allow('').default(''),
  // req.body에서 [경도,위도]로 받아오고, service에서 GeoJSON으로 변환해서 저장
  location: Joi.array()
    .items(
      Joi.number().min(-180).max(180), // 경도
      Joi.number().min(-90).max(90), // 위도
    )
    .length(2)
    .required(),
  open_times: Joi.array().items(Joi.string()).default([]),
  sns_url: Joi.array().items(Joi.string()).default([]),
  // deleted_at: repository에서 new Date() 값을 저장
});

module.exports = placeValidationSchema;
