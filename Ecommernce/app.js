const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
// setting config.env files variables
dotenv.config({path : "./config/config.env"})
const validator = require("validator")
console.log(validator);

connectDB();

const app = express();

app.use(express.json());

// importing routes
const productRoute = require("./routes/productRoute");


app.use("/api/v1/admin", productRoute)






app.listen(process.env.PORT, ()=>{
    console.log(`Server running on ${process.env.PORT}`)
})

