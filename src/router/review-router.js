const express = require('express');
const reviewController = require('../review/review-controller');
const authMiddleware = require('../middleware/auth-middleware');
const validationMiddleware = require('../middleware/validation-middleware');

const reviewRouter = express.Router();

// GET /reviews/me?pageNumber=number&pageSize=number
reviewRouter.get(
  '/reviews/me',
  authMiddleware.isAuthenticated,
  reviewController.getReviews,
);

// GET /reviews?placeId=value&pageNumber=number&pageSize=number
reviewRouter.get('/reviews', reviewController.getReviews);

// GET /admin/reviews?pageNumber=number&pageSize=number
reviewRouter.get(
  '/admin/reviews',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  reviewController.getReviews,
);

// POST /reviews
reviewRouter.post(
  '/reviews',
  authMiddleware.isAuthenticated,
  validationMiddleware.validateRequest,
  reviewController.postReview,
);

// PATCH /reviews/:reviewId
reviewRouter.patch(
  '/reviews/:reviewId',
  authMiddleware.isAuthenticated,
  validationMiddleware.validateRequest,
  reviewController.patchReview,
);

// DELETE /reviews/:reviewId
reviewRouter.delete(
  '/reviews/:reviewId',
  authMiddleware.isAuthenticated,
  reviewController.deleteReiview,
);

// DELETE /admin/reviews/:reviewId
reviewRouter.delete(
  '/admin/reviews/:reviewId',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  reviewController.deleteReiview,
);

module.exports = reviewRouter;
