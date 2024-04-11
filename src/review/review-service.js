const reviewRepository = require('./review-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');

const reviewService = {
  // 새로운 리뷰 등록
  async createReview({ placeId, content, userId }) {
    const newReview = await reviewRepository.createReview({
      placeId,
      content,
      userId,
    });
    if (newReview === null) {
      throw new AppError(
        commonErrors.objectCreationError,
        '리뷰 등록에 실패하였습니다.',
        400,
      );
    }
    return { message: '정상적으로 등록되었습니다.', newReview };
  },
  // 조건에 맞는 리뷰 모두 가져오기
  async getReviews(pageNumber, pageSize, placeId, userId) {
    const reviews = await reviewRepository.findReviews(
      pageNumber,
      pageSize,
      placeId,
      userId,
    );
    return reviews;
  },
  // 특정 id를 가진 리뷰 내용 수정
  async updateReview(id, content) {
    const updatedReview = await reviewRepository.updateReview(id, content);
    if (updatedReview === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 리뷰가 없습니다.',
        400,
      );
    }
    return { message: '정상적으로 수정되었습니다.', updatedReview };
  },
  // 특정 id를 가진 리뷰 삭제
  async deleteReview(id) {
    const deletedReview = await reviewRepository.deleteReview(id);
    if (deletedReview === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 리뷰가 없습니다.',
        400,
      );
    }
    return { message: '정상적으로 삭제되었습니다.', deletedReview };
  },
};

module.exports = reviewService;
