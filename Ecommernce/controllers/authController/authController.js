const User = require("../../models/merchant");
const Customer = require("../../models/customer");
const {userSchema,customerSchema} = require("../../utils/userValidation");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path: "../config.env"});
const crypto = require("crypto");


// Create Users =>/api/v1/auth/merchant/register
exports.createUser = async (req,res, next)=>{
    try{
        // validation with Joi
        const payload = await userSchema.validateAsync(req.body);

        // check if email exist
        const user = await User.findOne({email : payload.email});
        if(user) throw createError.Conflict(`${payload.email} is already registered`);

        // encrypt password
        let hashedPassword = await bcrypt.hash(payload.password, 12);
            payload.password = hashedPassword;

        const newUser = await User.create(payload);
        await newUser.save()

        res.status(201).json({
            success : true,
            data : newUser,
            message: "New user created successfully"
        })
    }catch(error){
        if(error.isJoi) error.status =422;
        next(error);
    }
}

// Login in users /api/v1/auth/merchant
exports.login = async(req, res, next)=>{
    
    const {email, password} = req.body;

    try{
        // checking if email exist in the database
        const user = await User.findOne({email : email}).select("+password")
        if(!user){
            return res.status(404).json({
                success : false,
                message : "No user with this email"
            });
        };
        // compare password
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
             res.status(400).json({
                success : false,
                message : "invalid email/password"
            });
        }
        // get Accesstoken using jwt
        const refreshtoken = jwt.sign({id : user._id, fullName : `${user.firstName} ${user.lastName}`, email : user.email}, process.env.JWT_SECRET_KEY, {expiresIn : `1d`});
        const accessToken = jwt.sign({id : user._id, fullName : `${user.firstName} ${user.lastName}`, email : user.email, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn : `20m`});

        user.refreshToken = refreshtoken;
        await user.save();

        res.status(200).json({
            success : true,
            message : "successfully loggedIn",
            data : user,
            accesstoken : accessToken,
            refreshtoken : refreshtoken

        });

    }catch(error){
            next(error)
    }
}

// Create customers =>/api/v1/user/register
exports.createCustomer = async (req,res, next)=>{
    try{
        // validation with Joi
        const payload = await customerSchema.validateAsync(req.body);

        // check if email exist
        const user = await Customer.findOne({email : payload.email});
        if(user) throw createError.Conflict(`${payload.email} is already registered`);

        // encrypt password
        let hashedPassword = await bcrypt.hash(payload.password, 12);
            payload.password = hashedPassword;

        const newUser = await Customer.create(payload);
        await newUser.save()

        res.status(201).json({
            success : true,
            data : newUser,
            message: "New user created successfully"
        })
    }catch(error){
        if(error.isJoi) error.status =422;
        next(error);
    }
}

// Login in users /api/v1/auth/merchant
exports.loginCustomer = async(req, res, next)=>{

    try{
    const {email, password}= req.body;

        // checking if email exist in the database
        const user = await Customer.findOne({email : email}).select("+password")
        if(!user){
            return res.status(404).json({
                success : false,
                message : "No user with this email"
            });
        };

        // compare password
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
             res.status(400).json({
                success : false,
                message : "invalid email/password"
            });
        }
         
        // get Accesstoken using jwt
        const refreshtoken = jwt.sign({id : user._id, fullName : `${user.firstName} ${user.lastName}`, email : user.email}, process.env.JWT_SECRET_KEY, {expiresIn : `1d`});
        const accessToken = jwt.sign({id : user._id, fullName : `${user.firstName} ${user.lastName}`, email : user.email, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn : `20m`});

        user.refreshToken = refreshtoken;

        await user.save();

        res.status(200).json({
            success : true,
            message : "successfully loggedIn",
            data : user,
            accesstoken : accessToken,
            refreshtoken : refreshtoken

        });

    }catch(error){
            next(error)
        }
}

// change password /api/v1/auth/reset-password
exports.forgotPassword =  async (req, res, next) =>{
    try{
        const user = await User.findOne({email : req.body.email})
        // console.log(user)
        if(!user){
            return res.status(404).json({
                success : false,
                message : "No such user!"
            })
        }

        // Generate a random token
        crypto.randomBytes(12, (err, Buffer)=>{
            if(err){
                return res.status(400).json({
                    success : false,
                    message : err.message
                })
            }
            const token = Buffer.toString("hex");
            user.resetToken = token;
            user.expiredResetToken = Date.now() + 3600000;
             user.save();

            res.status(201).json({
                success : true,
                message : "reset token created!",
                token : token
            })
        })
        


    }catch(errors){
        next(errors);

    }

}

exports.resetPassword = async (req, res, next)=>{
    let payload = req.body;
    const id = req.params.id

    try{
        let hashedPassword =  await bcrypt.hash(payload.password, 12);
        payload.password = hashedPassword;
        // console.log(password);
    
        const user = await User.findByIdAndUpdate({_id:id},payload, {new :true});
        
        if(!user || user.resetToken != payload.resetToken){
            return res.status(404).json({
                success : false,
                message : "invalid credentials"
            })
        }
       
        await user.save();
        res.status(201).json({
            success : true,
            data: user,
            message : "Password updated successfully"
        })
    
    }catch(errors){
        next(errors);
    }
    
    

}
