const reviewRepository = require('./review-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');

const reviewService = {
  // 새로운 리뷰 등록
  async createReview({ place_id, content, user_email }) {
    const userInfo = userRepository.findByEmail(user_email);
    const newReview = await reviewRepository.createPlace({
      place_id,
      content,
      author: userInfo.nickname,
      author_tag: userInfo.tag,
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
  // 특정 id를 가진 리뷰 가져오기
  async getReview(id) {
    const review = await reviewRepository.findReviewById(id);
    if (review === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        400,
      );
    }
    return review;
  },
  // 조건을 만족하는 리뷰 모두 가져오기
  async getReviews(author, place_id) {
    const reviews = await reviewRepository.findPlaces(author, place_id);
    if (reviews.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 조건을 만족하는 리뷰가 존재하지 않습니다',
        404,
      );
    }
    return reviews;
  },
  // 특정 id를 가진 리뷰 내용 수정
  async updateReview(id, { place_id, content, author, author_tag }) {
    const updatedReview = await reviewRepository.updateReview(id, {
      place_id,
      content,
      author,
      author_tag,
    });
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
