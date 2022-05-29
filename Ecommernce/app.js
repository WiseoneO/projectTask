const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const createError = require("http-errors");

// setting config.env files variables
dotenv.config({path: "./config.env"});

connectDB();

const app = express();

app.use(express.json());

// importing routes
// const shopRoute = require("./routes/shopRoute")
const authRoute = require("./routes/authRoute")
const merchantRoute = require("./routes/merchantRoute")
const customerRoute = require("./routes/customerRoute")

// firing the routes
// app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/merchant", merchantRoute);
app.use("/api/v1/user", customerRoute);


// handling 404 route
app.use(async(req, res, next)=>{
    next(createError.NotFound());
})

app.use(async (error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});





app.listen(process.env.PORT || 6000, ()=>{
    console.log(`Server running on ${process.env.PORT}`)
})

