const mongoose = require('mongoose');

const reportedPlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    category_img: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    vegan_option: {
      type: Boolean,
      required: true,
    },
    tel: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: true,
    },
    address_lot_number: {
      type: String,
      required: true,
    },
    address_detail: {
      type: String,
      default: '',
    },
    location: {
      type: [Number], // [경도, 위도]
      required: true,
    },
    open_times: {
      type: [String],
      default: [],
    },
    sns_url: {
      type: [String],
      default: [],
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

const ReportedPlace = mongoose.model('ReportedPlace', reportedPlaceSchema);

module.exports = ReportedPlace;
