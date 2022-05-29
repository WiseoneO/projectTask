const Joi = require("joi");

const userSchema = Joi.object({
    firstName : Joi.string().min(3).max(30).required(),
    lastName : Joi.string().min(3).max(30).required(),
    storeName : Joi.string().min(3).max(100).required(),
    email : Joi.string().email().min(3).max(40).required(),
    phoneNumber : Joi.number().min(7).required(),
    password : Joi.string().min(6).required(),
    role : Joi.string().required()
});

const customerSchema = Joi.object({
    firstName : Joi.string().min(3).max(30).required(),
    lastName : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().min(3).max(40).required(),
    password : Joi.string().min(6).required(),
    role : Joi.string()
});

module.exports = {userSchema, customerSchema}