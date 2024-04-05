const User  = require('./userSchema');


const UserRepository = {
    findById: async (id) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    
   findOne: async (where) => {
    try {
      const user = await User.findOne({ where });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  },

};

module.exports = UserRepository;