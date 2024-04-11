const Joi = require('joi');

const bookmarkValidationSchema = Joi.object({
    place_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // MongoDB ObjectId 형식
    user_id: Joi.optional(),
});

module.exports = bookmarkValidationSchema;