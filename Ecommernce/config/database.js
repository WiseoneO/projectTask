const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "../config.env"});

const connectDB = ()=>{mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log(`mongoDB database connected`))
}

module.exports = connectDB