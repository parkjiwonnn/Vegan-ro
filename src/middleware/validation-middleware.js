const placeValidationSchema = require('./validation/place-validation-schema');
const reportedPlaceValidationSchema = require('./validation/report-validaton-schema');
const reviewValidationSchema = require('./validation/review-validation-schema');

function validatePlace(req, res, next) {
  const { error, value } = placeValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  }
  // 유효성 검사를 통과한 데이터를 req.body에 대체
  req.body = value;
  next();
}

function validateReportedPlace(req, res, next) {
  const { error, value } = reportedPlaceValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  }
  // 유효성 검사를 통과한 데이터를 req.body에 대체
  req.body = value;
  next();
}

function validateReview(req, res, next) {
  const { error, value } = reviewValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  }
  // 유효성 검사를 통과한 데이터를 req.body에 대체
  req.body = value;
  next();
}

module.exports = { validatePlace, validateReportedPlace, validateReview };
