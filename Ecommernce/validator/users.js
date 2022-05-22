const Joi = require('joi');
const {validate} = require("express-validation")


const userValidation = data => {
    const userSchema = Joi.object({
        firstName : Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
            lastName : Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
            storeName : Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
            email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phoneNumber : Joi.number().min(11),
            password: Joi.string().min(6).max(12)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    });
return userSchema.validate(data)
};

   
module.exports = userValidation