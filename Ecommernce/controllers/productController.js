const Products = require("../models/product");

// Creating new project => /api/v1/admin/create
exports.newProduct = async (req, res,next) => {
    const {name, price, quantity, description,size} = req.body;

    try{
        const newProduct = await Products.create({name, price, quantity, description,size});
        await newProduct.save();

        res.status(201).json({
            success : true,
            data : newProduct,
            message : "Created successfully",
        });
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
}

// Get all product =>/api/v1/admin/shop
exports.getAllProduct = async (req, res, next)=>{
    //get all product
    const products = await Products.find({});

        try{
            // if product database is empty
            if(products.length === 0){
                return res.status(200).json({
                    success : true,
                    message : "No product Found"
                })
            }
                res.status(200).json({
                    success : true,
                    total : products.length,
                    data : products
                })
        }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
                
    
}

// Fetching a single Item =>/api/v1/admin/:id
exports.singleItem = async (req, res, next)=>{
    const oneItem = await Products.findOne({_id : req.params.id})

    res.status(200).json({
        success : true,
        data : oneItem
    })
}

// Update Product /api/vi/admin/edit/:id
exports.updateProduct = async (req, res, next)=>{
    const id = req.params.id
    const updatedProduct = req.body;

    try{
        const product = await Products.findByIdAndUpdate({_id : id}, updatedProduct,{new :true});
        const result= await product.save()

        res.status(201).json({
            success : true,
            data: result,
            message : `Item with have been updated successully`

        })
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
}

// Deleting a signle product =>/api/v1/admin/delete/:id
exports.deleteItem = async (req, res,next)=>{
    try{
        deletedItem = await Products.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success : true,
            result : deletedItem,
            message : "Item deleted successfully"

        })
    }catch(errors){
        res.status(400).json({
            success : false,
            message : errors.message
        })
    }
    
}