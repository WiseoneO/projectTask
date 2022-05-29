const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
    dotenv.config({path: "../config.env"});

    // token must exist and must constain the Bearer prefix
// token must matc

const verifyUser = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            success : false,
            message : "forbidden"
        })
    }

    try{
        const token = authHeader.split(" ")[1];
        let verifed = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verifed
        next();

    }catch(error){
        next(error)
    }
}

module.exports = {verifyUser};