const Joi = require('joi');

const registerValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().optional(),
    nickname: Joi.string().optional(),
    phone: Joi.string().optional(),
    tag: Joi.string().optional(),
    tag_img: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(), // MongoDB ObjectId 형식
    complaint: Joi.number().optional(),
    is_admin: Joi.boolean().optional(),
    deleted_at: Joi.date().optional(),
});

module.exports = registerValidationSchema;