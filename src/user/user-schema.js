const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    nickname: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    tag: {
      type: String,
      required: false,
    },
    img: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: false,
    },
    is_admin: {
      type: Boolean,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
