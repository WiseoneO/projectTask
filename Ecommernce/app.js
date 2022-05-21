const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
// setting config.env files variables
dotenv.config({path : "./config/config.env"})

connectDB();

const app = express();

app.use(express.json());

// importing routes
const shopRoute = require("./routes/shopRoute");
const userRoute = require("./routes/userRoute");


app.use("/api/v1", shopRoute);
app.use("/api/v1", userRoute);






app.listen(process.env.PORT, ()=>{
    console.log(`Server running on ${process.env.PORT}`)
})

