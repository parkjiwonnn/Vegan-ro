const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    place_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
