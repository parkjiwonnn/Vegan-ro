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
    img: {
      type: mongoose.Types.ObjectId,
      ref: 'image',
      required: true,
    },
    all_veg: {
      type: Boolean,
      required: true,
    },
    tel: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    address_detail: {
      type: String,
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
    hours: {
      type: String,
    },
    url: {
      type: String,
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
