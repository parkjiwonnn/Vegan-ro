const reviewService = require('./review-service');
const responseFormat = require('../errors/responseFormat');

const reviewController = {
  // 유저의 리뷰 모두 보기 GET
  async getReviewsByUser(req, res, next) {
    try {
      const review = await reviewService.getReviewsByUser(
        res.locals.token.email,
      );
      res.json(responseFormat.buildResponse(review));
    } catch (error) {
      next(error);
    }
  },
  // 장소의 리뷰 모두 보기 GET
  async getReviews(req, res, next) {
    try {
      const { placeId } = req.query;
      const reviews = await reviewService.getReviews(placeId);
      res.json(responseFormat.buildResponse(reviews));
    } catch (error) {
      next(error);
    }
  },
  // 새로운 장소 등록 POST
  async postReview(req, res, next) {
    try {
      const { place_id, content } = req.body;
      const newReview = await reviewService.createReview({
        place_id,
        content,
        user_email: res.locals.token.email,
      });
      res.json(responseFormat.buildResponse(newReview));
    } catch (error) {
      next(error);
    }
  },
  // 리뷰 수정 PUT
  async putReview(req, res, next) {
    try {
      const { reviewId } = req.params;
      const { place_id, content, author, author_tag } = req.body;
      const updatedReview = await reviewService.updateReview(reviewId, {
        place_id,
        content,
        author,
        author_tag,
      });
      res.json(responseFormat.buildResponse(updatedReview));
    } catch (error) {
      next(error);
    }
  },
  // 리뷰 삭제 DELETE
  async deleteReiview(req, res, next) {
    try {
      const { reviewId } = req.params;
      const deletedReview = await reviewService.deleteReview(reviewId);
      res.json(responseFormat.buildResponse(deletedReview));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reviewController;
