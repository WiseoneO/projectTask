const Joi = require('joi');
const {validate} = require("express-validation")


const userValidation = Joi.object({
    
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
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phoneNumber : Joi.number().less(15),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    
});

userValidation.validate({})
   
module.exports = userValidation