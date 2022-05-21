const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { findByIdAndDelete } = require("../models/user");
dotenv.config({path : "./config/config.env"})


// create new user => /api/v1/register
exports.createUser = async (req, res,next)=>{
    let {firstName, lastName, storeName, email, phoneNumber, password} = req.body;

    try{
        // check if email exist
        const user = await Users.findOne({email : email});
        if(user){
            return res.status(400).json({
                success : false,
                message : "Email already exist"
            });
        }

        // hash the Password
        let hashedPassword = await bcrypt.hash(password, 12);
        // reassign the password
        password = hashedPassword;

        const createdUser = await Users.create({firstName, lastName, storeName, email, phoneNumber, password});
        await createdUser.save();

        res.status(201).json({
            success : true,
            message : "User created successfully",
            data : createdUser

        })
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
        // console.log(errors)
    }
    
}

// Sign users in =>/api/v1/login
exports.signIn = async (req, res, next)=>{
    const {email, password} = req.body;
    try{
        // check if user exist
        const user = await Users.findOne({email : email});
        if(!user){
            return res.status(400).json({
                success : false,
                message: "Users does not exist"
            });
        }

        // validate password
        const isValidatedPassword = await bcrypt.compare(password, user.password);

        if(!isValidatedPassword){
            return res.status(400).json({
                success : false,
                message : "invalid email/password"
            });
        }

        const token = jwt.sign({id : user._id, name: user.firstName, email: user.email, password: user.password},process.env.JWT_SECRET_KEY);

        res.status(200).json({
            success : true,
            message : "Successfully loggedIn",
            data : user.firstName+ " "+ user.lastName,
            token :token
        })
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
}

// Find all users => /api/v1/users
exports.getAllUser = async(req, res, next)=>{
    //get  users
    const users = await Users.find({});

        try{
            // if users database is empty
            if(users.length === 0){
                return res.status(200).json({
                    success : true,
                    message : "No user Found!"
                })
            }
                res.status(200).json({
                    success : true,
                    total : users.length,
                    data : users
                })
        }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
    
}

// Delete User =>/api/v1/:id

exports.deleteOne = async(req, res, next)=>{
    const id = req.params.id;
    const user = await Users.findOne({_id : id});

    try{
        if(!user){
            return res.status(400).json({
                success : false,
                message : "No user found!"
            })
        }

        await Users.findByIdAndDelete(user.id);
        res.status(200).json({
            success : true,
            data : user,
            message : "User Deleted"
        })

    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
    
}

// Update a user
exports.editUser = async(req, res, next)=>{
    const id = req.params.id;
    let {firstName, lastName, storeName, email, phoneNumber, password} = req.body;

    

    try{
        let hashedPassword = await bcrypt.hash(password, 12);
        password = hashedPassword;

        const user = await Users.findByIdAndUpdate({_id:id},{ firstName, lastName, storeName, email, phoneNumber, password}, {new :true});


        if(!user){
            return res.status(400).json({
                success : false,
                message : "No user found!"
            })
        }

        const updatedUser = await user.save();
    
        res.status(201).json({
            success : true,
            message : "User profile updated successfully",
            data : updatedUser
        })
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
   

}