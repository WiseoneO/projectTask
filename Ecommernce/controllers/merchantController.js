const User = require("../models/merchant");
const Product = require("../models/product");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

exports.createProduct = async (req, res)=>{
    const {id} = req.user;
    const {name, price, quantity, description,size} = req.body;

    try{
        if(req.user.role != "merchant"){
            return res.status(400).json({
                success: false,
                message: "you are not authorized"
            })
        }
        const newProduct = await Product.create({name, price, quantity, description,size, userId: id});
        await newProduct.save();
   
        res.status(201).json({
            success : true,
            message : "New product created",
            data : newProduct
        });
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
}





// Get all products from the databas => /api/v1/merchant/all-product
exports.getAllProducts = async (req, res,next)=>{
    
    const products = await Product.find({userId : req.user.id}).populate({path: "userId", select :["firstName", "lastName", "email", "role"] });
        if(products.length === 0){
            return res.status(200).json({
                success : true,
                message : "No product"
            })
        }

     res.status(200).json({
        success : true,
        total_no_product: products.length,
        data : products
    })
}

// get Single product
exports.getSingleProduct = async (req, res)=>{

    const singleProduct = await Product.findOne({_id : req.params.id}, {userId : req.user}).populate({path: "userId", select :["firstName", "lastName", "email", "role"] });
    if(singleProduct <= 0){
        return res.status(200).json({
            success : true,
            message : "No product found"
        })
    }
    res.status(200).json({
        success : true,
        message : "successfully retrived data",
        data : singleProduct
    });
}

// Update a single product =>/api/v1/shop/:id 
exports.editProduct = async (req, res)=>{
    const payload = req.body;

    try{
        updatedProduct = await Product.findByIdAndUpdate({_id: req.params.id}, payload, {new: true})

        // check if the user id matches the product id
            if(req.user.id != updatedProduct.userId){
                return res.status(400).json({
                    success :false,
                    message: "Only the creator can perform such operation"
                })
            }
            if(req.user.role != "merchant"){
                return res.status(400).json({
                    success: false,
                    message: "you are not authorized"
                })
            }
            res.status(201).json({
                    success : true,
                    message : "Successfully updated one product in the database",
                    data : updatedProduct
                });  
 
        }catch(errors){
            res.status(400).json({
                success : false,
                message : errors.message
            })
        }        
}


// Update a single user =>/api/v1/user/:id 
exports.editUser = async (req, res)=>{
    const id = req.params.id;
    let payload = req.body;

    try{
        let hashedPassword = await bcrypt.hash(payload.password, 12);
        payload.password = hashedPassword;

        const user = await User.findByIdAndUpdate({_id:id},payload, {new :true});

        if(!user){
            return res.status(400).json({
                success : false,
                message : "No user found!"
            });
        }
        const updatedUser = await user.save();

        res.status(201).json({
            success : true,
            message : "User profile updated successfully",
            data : updatedUser
        })
    }catch(errors){
        next(errors);

    }
}


// Delete a single product =>/api/v1/shop/:id 
exports.deleteProduct = async(req, res)=>{
    try{
        const product = await Product.findOne({id: req.params.id});

        // check if the user id matches the product id
        if(req.user.id != product.userId){
            return res.status(400).json({
                success :false,
                message: "Only the creator can perform this operation"
            })
        }

        if(req.user.role != "merchant"){
            return res.status(400).json({
                success: false,
                message: "you are not authorized"
            })
        }

        const deletedProduct = await Product.findByIdAndDelete(product._id);
        res.status(201).json({
                success : true,
                message : "Successfully deleted one product in the database",
                data : deletedProduct
        }); 
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
    
}