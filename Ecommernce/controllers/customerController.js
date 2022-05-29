const Customer = require("../models/customer");
const Product = require("../models/product");

// retrive all products

exports.getProducts = async (req, res)=>{
    const products = await Product.find({});

    res.status(200).json({
        success : true,
        data : products
    })
}

// get Single product
exports.getSingleProduct = async (req, res)=>{
    const singleProduct = await Product.findOne({_id : req.params.id});

    if(singleProduct <= 0){
        return res.status(200).json({
            success : true,
            message : "No product found"
        });
    }
    res.status(200).json({
        success : true,
        message : "successfully retrived data",
        data : singleProduct
    });
}

// Deleting a user => /api/v1/user/:id
exports.deleteUser = async (req, res, next)=>{
    const id = req.params.id
    const deleteUser = await Customer.findByIdAndDelete(id);

    if(req.user.id != id){
        return res.status(400).json({
            success : false,
            message : "Denied!"
        })
    }

    res.status(200).json({
        success : true,
        data: deleteUser,
        message: "user deleted"
    })


}