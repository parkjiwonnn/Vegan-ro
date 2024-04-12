const User = require('./user-schema');
const Review = require('../review/review-schema');

class UserRepository {
  async findUserById(userId) {
    try {
      const user = await User.findById(userId).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByEmail(email) {
    const users = await User.find({ email }).lean();
    if (users.length === 0) {
      return null;
    }
    return users[0];
  }

  async findUserOne(where) {
    try {
      const user = await User.findOne(where).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  //일반 회원가입
  async createUser(data){ 
      const { email , password } = data; 
      const user = await User.create({
        email,
        password,
        name:null,
        nickname:null,
        phone:null,
        tag: null,
        tag_img: null,
        is_admin: false, 
        complaint: 0,
        deleted_at: null
      });
      await user.save();

      return user.toObject();
    }

  //카카오 회원가입 
  async createUserForKakao(data) {
    try {
      const { email } = data; // data 객체에서 필요한 속성 추출
      const newUser = await User.create({
        email,
        password:null,
        name:null,
        nickname:null,
        phone:null,
        tag: null,
        tag_img: null,
        is_admin: false, // 기본값 설정
        complaint: 0,
        deleted_at: null, // 기본값 설정
      });
      return newUser; // 생성된 유저 객체를 반환하는 것이 좋습니다.
    } catch (error) {
      throw new Error(error); // 에러 처리
    }
  }

  //회원 정보 수정
  async updateByEmail(email, { nickname, tag ,tagImg }) {
    try {
      const updatedUser = await User.findOneAndUpdate({ email } , { nickname, tag , tag_img: tagImg }, {
        new: true,
      },
    ).populate('tag_img')
    .lean();
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  // 회원 탈퇴
  async patchByEmail(email) {
    try {
      const currentDate = new Date();

      const patchedUser = await User.findOneAndUpdate(
        { email }, // 조건
        { $set: { deleted_at: currentDate } },
        { new: true, lean: true },
      );

      return patchedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
// 리뷰 아이디로부터 사용자의 ID 가져오기
async getUserIdByReviewId(reviewId) {
  try {
    const review = await Review.findById(  {_id: reviewId} );
    return review.user_id;
  } catch (error) {
    throw new Error(error);
  }
}

async incrementComplaintById(userId) {
  try {
    const patchedUserComplaint = await User.findByIdAndUpdate(
      userId,
      { $inc: { complaint: 1 } }, 
      { new: true, lean: true });
 
    return patchedUserComplaint;
  } catch (error) {
    throw new Error(error);
  }
}




  //관리자 모든 회원 정보 조회
  async allUsers() {
    try {
      const users = await User.find({}).lean();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
  //관리자 회원 정보 삭제
  async deleteById(id) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: id });
      return deletedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new UserRepository();
