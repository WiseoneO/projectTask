const express = require("express");
const validator = require("validator");

const router = express.Router();

const {newProduct,getAllProduct,updateProduct,deleteItem,singleItem} = require("../controllers/shopController");

router.route("/shop").get(getAllProduct);
router.route("/create").post(newProduct);
router.route("/:id").put(updateProduct).delete(deleteItem).get(singleItem);

module.exports = router;