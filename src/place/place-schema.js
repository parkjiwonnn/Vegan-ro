const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
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
      type: {
        type: String, // GeoJSON 타입
        enum: ['Point'], // 'location.type'은 'Point'만 가능
        required: true,
      },
      coordinates: {
        type: [Number], // [경도, 위도]
        required: true,
      },
    },
    open_times: {
      type: [String],
      default: [],
    },
    sns_url: {
      type: [String],
      default: [],
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

placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
