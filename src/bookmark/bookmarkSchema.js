const { Schema } = require('mongoose');

const bookmarkSchema = new Schema(
    {
    place_id: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
 {
    collection: "Bookmark",
  timestamps: true,
 },
);

module.exports = bookmarkSchema;
