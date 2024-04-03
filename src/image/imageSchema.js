const { Schema } = require('mongoose');

const imageSchema = new Schema(
    {
    img: {
        type: String,
        required: true,
    }
},
 {
    collection: "Image",
  timestamps: true,
 },
);

module.exports = imageSchema;
