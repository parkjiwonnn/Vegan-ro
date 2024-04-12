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
  switch (true) {
    case t === '/admin/places' || t.startsWith('/admin/places/'):
      return placeValidationSchema;
    case t === '/reports' || t.startsWith('/reports/'):
      return reportedPlaceValidationSchema;
    case t === '/reviews':
      return reviewValidationSchema;
    case t.startsWith('/reviews/'):
      return patchReviewValidationSchema;
    case t === '/users/me':
      return userValidationSchema;
    case t.startsWith('/users/complaint/'):
      return userValidationSchema;
    case t === '/signup' || t === '/login':
      return registerValidationSchema;
    case t === '/admin' || t.startsWith('/admin/images/'):
      return imageValidationSchema;
    case t === '/bookmarks':
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
