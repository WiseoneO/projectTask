const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        maxlength: [20, "cannot exceed 20 characters"],
        required : [true, "Please enter your first name"]
    },
    lastName : {
        type: String,
        maxlength: [20, "cannot exceed 20 characters"],
        required : [true, "Please enter your last name"]
    },

    storeName: {
        type :String,
        maxlength: [30, "cannot exceed 30 characters"],
        required : [true, "Please enter your Your store name"]  
    },

    email : {
        type : String,
        trim : true,
        required : [true, "Please Enter Your email Address"],
        unique : true,
        validate : [validator.isEmail, "Please enter a valid email address"]
    },
    
    password : {
        type : String,
        required : [true, "Please enter password for your account"],
        isAlphanumericLocales: [
            'en-US',       'az-AZ', 'bg-BG', 'cs-CZ',]
    },

    phoneNumber : {
        type : Number,
        required : [true, 'Please enter your phone number'],
    },
    createdAt : {
        type: Date,
        default : Date.now
    }
});



module.exports = mongoose.model("Users", userSchema)