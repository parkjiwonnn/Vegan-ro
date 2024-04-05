const User = require('./user-schema');

const UserRepository = {
  findUserById: async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },

  findUserOne: async (where) => {
    try {
      const user = await User.findOne({ where });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  createUser: async (data) => {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = UserRepository;
