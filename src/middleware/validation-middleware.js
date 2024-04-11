const placeValidationSchema = require('./validation/place-validation-schema');
const reportedPlaceValidationSchema = require('./validation/report-validaton-schema');
const {
  reviewValidationSchema,
  patchReviewValidationSchema,
} = require('./validation/review-validation-schema');
const userValidationSchema = require('./validation/user-validation-schema');
const bookmarkValidationSchema = require('./validation/bookmark-validation-schema');
const imageValidationSchema = require('./validation/image-validation-schema');
const registerValidationSchema = require('./validation/register-validation-schema');

const AppError = require('../errors/AppError');
const commonErrors = require('../errors/commonErrors');
const _ = require('lodash');

function getPath(path) {
  const t = path.slice('api');
  switch (t) {
    case '/admin/places':
      return placeValidationSchema;
    case '/admin/places/:placeId':
      return placeValidationSchema;
    case '/reports':
      return reportedPlaceValidationSchema;
    case '/reports/:reportedPlaceId':
      return reportedPlaceValidationSchema;
    case '/reviews':
      return reviewValidationSchema;
    case '/reviews/:reviewId':
      return patchReviewValidationSchema;
    case '/users/me':
      return userValidationSchema;
    case '/signup':
      return registerValidationSchema;
    case '/login':
      return registerValidationSchema;
    case '/admin':
      return imageValidationSchema;
    case '/admin/images/:imageId':
      return imageValidationSchema;
    case '/bookmarks':
      return bookmarkValidationSchema;
    default:
      return null;
  }
}

function convertSnakeToCamelCase(obj) {
  return _.mapKeys(obj, (value, key) => _.camelCase(key));
}

function validateRequest(req, res, next) {
  const schema = getPath(req.path);
  if (!schema) {
    throw new AppError(
      commonErrors.resourceNotFoundError,
      '잘못된 URL 입니다.',
      404,
    );
  }
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const reqBody = convertSnakeToCamelCase(value);

  req.body = reqBody;
  next();
}

module.exports = {
  validateRequest,
};
