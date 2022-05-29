const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type: String,
        lowercase : true
    },
    password : {
        type : String,
        select : false,
    },
    role : {
     type : String,
     required : [true, " Please select role"],
     enum : {
         values : ["customer", "merchant"],
         message : "Please select correct role."
     },
     default : "customer"
    },
    resetToken: String,
    expiredResetToken : Date
})

module.exports = mongoose.model("Customer", customerSchema)