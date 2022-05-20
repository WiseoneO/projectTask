const express = require("express");

const router = express.Router();

const {newProduct,getAllProduct,updateProduct,deleteItem,singleItem} = require("../controllers/productController");

router.route("/shop").get(getAllProduct);
router.route("/create").post(newProduct);
router.route("/:id").put(updateProduct).delete(deleteItem).get(singleItem)

module.exports = router;