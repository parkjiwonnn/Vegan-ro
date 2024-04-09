const reviewRepository = require('./review-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');
const userRepository = require('../user/user-repository.js');

const reviewService = {
  // 새로운 리뷰 등록
  async createReview({ place_id, content, user_id }) {
    const userInfo = await userRepository.findUserById(user_id);
    const newReview = await reviewRepository.createReview({
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
  // 장소의 리뷰 모두 가져오기
  async getReviews(pageNumber, pageSize, place_id) {
    const reviews = await reviewRepository.findReviews(
      pageNumber,
      pageSize,
      place_id,
    );
    if (reviews.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 조건을 만족하는 리뷰가 존재하지 않습니다',
        400,
      );
    }
    return reviews;
  },
  // 유저의 리뷰 모두 가져오기
  async getReviewsByUser(userId, pageNumber, pageSize) {
    const userInfo = await userRepository.findUserById(userId);
    if (!userInfo) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '사용자 정보를 찾을 수 없습니다',
        400,
      );
    }
    const reviews = await reviewRepository.findReviews(pageNumber, pageSize, {
      author: userInfo.nickname,
    });
    if (reviews.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 조건을 만족하는 리뷰가 존재하지 않습니다',
        400,
      );
    }
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
