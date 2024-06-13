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
      default: null,
    },
    nickname: {
      type: String,
      default: null,
      unique: true,
    },
    phone: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: null,
    },
    tag_img: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      default: null,
    },
    complaint: {
      type: Number,
      required: true,
      default: 0,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
