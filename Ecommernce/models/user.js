const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        trim : true,
        maxlength: [20, "cannot exceed 20 characters"],
        required : [true, "Please enter your first name"]
    },
    lastName : {
        type: String,
        trim : true,
        maxlength: [20, "cannot exceed 20 characters"],
        required : [true, "Please enter your last name"]
    },

    StoreName: {
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
        minlength : [6, "Your password must be at least 8 character long"],
        select : false,
    },

    phoneNumber : {
        type : Number,
        required : [true, 'Please enter your phone number'],
        unique: true
    },
    cratedAt : {
        type: Date,
        default : Date.now
    }
});



module.exports = mongoose.model("Users", userSchema)