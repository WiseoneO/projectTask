const express = require("express");
const {verifyUser} = require("../middlewares/authorize")

const router = express.Router();

const {getAllProducts,createProduct, getSingleProduct,editProduct,deleteProduct} = require("../controllers/merchantController")


// router.get("/all",getAllUsers )
router.post("/add-product",verifyUser,createProduct )

router.get("/all-products",verifyUser,getAllProducts )

router.route("/:id").get(getSingleProduct).put(verifyUser, editProduct).delete(verifyUser, deleteProduct)

module.exports = router;

// put(editProduct)