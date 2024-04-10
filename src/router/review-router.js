const express = require('express');
const reviewController = require('../review/review-controller');
const userMiddleware = require('../middleware/user-middleware');

const reviewRouter = express.Router();

// GET /reviews/me?pageNumber=number&pageSize=number
reviewRouter.get(
  '/reviews/me',
  userMiddleware.isAuthenticated,
  reviewController.getReviewsByUser,
);

// GET /reviews?placeId=value&pageNumber=number&pageSize=number
reviewRouter.get('/reviews', reviewController.getReviews);

// GET /admin/reviews?pageNumber=number&pageSize=number
reviewRouter.get(
  '/admin/reviews',
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  reviewController.getReviews,
);

// POST /reviews
reviewRouter.post(
  '/reviews',
  userMiddleware.isAuthenticated,
  reviewController.postReview,
);

// PATCH /reviews/:reviewId
reviewRouter.patch(
  '/reviews/:reviewId',
  userMiddleware.isAuthenticated,
  reviewController.patchReview,
);

// DELETE /reviews/:reviewId
reviewRouter.delete(
  '/reviews/:reviewId',
  userMiddleware.isAuthenticated,
  reviewController.deleteReiview,
);

// DELETE /admin/reviews/:reviewId
reviewRouter.delete(
  '/admin/reviews/:reviewId',
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  reviewController.deleteReiview,
);

module.exports = reviewRouter;
