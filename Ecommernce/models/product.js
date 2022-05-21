const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
            type: String,
            maxlength: [20, "product name cannot exceed 20 characters."],
            required : [true, "Please enter the product name."]
        },

    price: {
            type :Number,
            required : [true, "Please enter a price for this item."],   
        },

    quantity: {
        type: Number,
        required : [true, "Please enter the available quantity for this item."]
    },

    description : {
        type: String,
        maxlength : [1000, "Description cannot exceed 1000 characters."],
        required : [true, "Kindly describe this items"]
    },
    
    size : {
        type: String,
    },
    createdAt : {
        type: Date,
        default : Date.now
    }
});




module.exports = mongoose.model("Product", productSchema)