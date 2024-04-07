const User = require('./user-schema');

class UserRepository {
  
  async findUserById(id) {
    try {
      const user = await User.findById(id).lean();
      return user;
    } catch (error) {
      throw new Error(error);
    }
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
      const newUser = await User.create(data);
      return newUser.toObject();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateByEmail(email, data) {
    try {
      const updatedUser = await User.findOneAndUpdate({ email }, data, { new: true }).lean();
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteByEmail(email) {
    try {
      const deletedUser = await User.findOneAndDelete({ email }).lean();
      return deletedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async allUsers() {
    try {
      const users = await User.find({}).lean();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new UserRepository();
