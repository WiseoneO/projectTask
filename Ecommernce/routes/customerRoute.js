const express = require("express");

const router = express.Router();
const {verifyUser} = require("../middlewares/authorize")

const {getProducts,getSingleProduct,deleteUser} = require("../controllers/customerController")


router.get("/all-products",getProducts )
router.route("/:id").get(getSingleProduct).delete(verifyUser, deleteUser)
// .get(getSingleProduct)

module.exports = router;