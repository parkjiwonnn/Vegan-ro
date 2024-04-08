const express = require('express');
const reviewController = require('../review/review-controller');

const reviewRouter = express.Router();

// GET /reviews/me
reviewRouter.get(
  '/reviews/me',
  // userMiddleware
  reviewController.getReviewsByUser,
);

// GET /reviews?placeId={placeId}
reviewRouter.get('/reviews', reviewController.getReviews);

// GET /admin/reviews
reviewRouter.get(
  '/admin/reviews',
  // adminMiddleware
  reviewController.getReviews,
);

// POST /reviews
reviewRouter.post(
  '/reviews',
  // userMiddleware
  reviewController.postReview,
);

// PUT /reviews/:reviewId
reviewRouter.put(
  '/reviews/:reviewId',
  // userMiddleware
  reviewController.putReview,
);

// DELETE /reviews/:reviewId
reviewRouter.delete(
  '/reviews/:reviewId',
  // userMiddleware
  reviewController.deleteReiview,
);

// DELETE /admin/reviews/:reviewId
reviewRouter.delete(
  '/admin/reviews/:reviewId',
  //adminMiddleware
  reviewController.deleteReiview,
);

module.exports = reviewRouter;
