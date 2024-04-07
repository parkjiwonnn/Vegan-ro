const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      basic_url: {
        type: String,
        required: true,
      },
      pin_url: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
