const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name : {
       type : String,
       required : true
   },
   price : {
       type : Number,
       required : true
   },
   quantity : {
       type : Number,
       required : true
   },
   description : {
       type: String,
       required: true
   },
   size : {
       type : String,
       required : true
   },
   userId :{ 
       type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},
{timestamps: true}

)

module.exports = mongoose.model("Product", productSchema);