const { Schema } = require('mongoose');

const userSchema = new Schema(
    {
    email:  {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    img: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    is_admin: {
        type: Boolean,
    },
    deleted_at: {
        type: Date,
    },
},
 {
    collection: "User",
  timestamps: true,
 },
);

module.exports = userSchema;
