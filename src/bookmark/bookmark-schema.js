const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    place_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
