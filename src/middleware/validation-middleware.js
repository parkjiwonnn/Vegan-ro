const placeValidationSchema = require('./validation/place-validation-schema');
const reportedPlaceValidationSchema = require('./validation/report-validaton-schema');
const reviewValidationSchema = require('./validation/review-validation-schema');
const userValidationSchema = require('./validation/user-validation-schema');
const bookmarkValidationSchema = require('./validation/bookmark-validation-schema');
const imageValidationSchema = require('./validation/image-validation-schema');
const registerValidationSchema = require('./validation/register-validation-schema');

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
function validateRegister(req, res, next) {
  const { error, value } = registerValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({ error: error.details.map(detail => detail.message) });
  }

  req.body = value; // 유효성 검사를 통과한 데이터를 req.body에 대체
  next();
}

function validateUser(req, res, next) {
  const { error, value } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({ error: error.details.map(detail => detail.message) });
  }

  req.body = value; // 유효성 검사를 통과한 데이터를 req.body에 대체
  next();
}

function validateBookmark(req, res, next) {
  const { error, value } = bookmarkValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({ error: error.details.map(detail => detail.message) });
  }

  req.body = value; // 유효성 검사를 통과한 데이터를 req.body에 대체
  next();
}

function validateImage(req, res, next) {
  const { error, value } = imageValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({ error: error.details.map(detail => detail.message) });
  }

  req.body = value; // 유효성 검사를 통과한 데이터를 req.body에 대체
  next();
}

module.exports = { validatePlace, validateReportedPlace, validateReview ,validateUser ,validateBookmark ,validateImage, validateRegister };
