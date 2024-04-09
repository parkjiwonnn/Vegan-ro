const Review = require('./review-schema');

const reviewRepository = {
  // 새로운 리뷰 추가
  async createReview({ place_id, content, author, author_tag }) {
    const newReview = new Review({
      place_id,
      content,
      author,
      author_tag,
    });
    await newReview.save();
    return newReview.toObject();
  },
  // id로 리뷰 찾기
  async findReviewById(id) {
    return await Review.findById(id).lean();
  },
  // 조건을 만족하는 리뷰 모두 찾기
  async findReviews(pageNumber, pageSize, place_id) {
    let query = {};

    if (place_id) {
      query.place_id = place_id;
    }

    let reviews;
    // 조건이 없다면 전체 데이터 가져오기
    if (Object.keys(query).length === 0) {
      reviews = await Review.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();
    } else {
      reviews = await Review.find(query)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();
    }
    return reviews;
  },
  // 특정 id를 가진 리뷰 내용 덮어씌우기
  async updateReview(id, content) {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        content,
      },
      { new: true },
    ).lean();
    return updatedReview;
  },
  // 특정 id를 가진 리뷰 삭제
  async deleteReview(id) {
    const deletedReview = await Review.findByIdAndDelete(id).lean();
    return deletedReview;
  },
};

module.exports = reviewRepository;
