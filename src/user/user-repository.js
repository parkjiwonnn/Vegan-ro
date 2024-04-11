const User = require('./user-schema');

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
  async createUser(data) {
    try {
      const { email } = data; // data 객체에서 필요한 속성 추출
      const newUser = await User.create({
        email,
        password: null, // 비밀번호는 특별한 처리 과정을 거쳐야 할 수 있으니, 이 부분은 주의해서 다루어야 합니다.
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
  async updateByEmail(email, data) {
    try {
      const updatedUser = await User.findOneAndUpdate({ email }, data, {
        new: true,
      }).lean();
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
