const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    img: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
    },
    complaint: {
      type: Number,
      required: true,
      default: 0,
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
