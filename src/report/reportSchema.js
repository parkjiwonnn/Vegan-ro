const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
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
      ref: 'Image',
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
    user_email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

reportSchema.index({ location: '2dsphere' });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
