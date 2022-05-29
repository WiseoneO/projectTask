const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
   firstName : {
       type : String
   },
   lastName : {
       type : String
   },
   storeName : {
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
   refreshToken : {
    type : String,
},
resetToken: String,
expiredResetToken : Date
},
{timestamps: true}
)

// userSchema.pre("save", async function(next){
//     try{
//         const hashedPassword = await bcrypt.hash(this.password, 12);
//         this.password = hashedPassword;
//     }catch(error){
//         next(error)
//     }
// })

// // Compare user password in the database password
// userSchema.methods.comparePassword = async function(enterPassword) {
//     return await bcrypt.compare(enterPassword, this.password);
// }


module.exports = mongoose.model("User", userSchema);