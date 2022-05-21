const express = require("express");
// const userValidation = require("../validator/users")
const router = express.Router();

// importing all controllers
const {createUser, signIn, getAllUser,deleteOne,editUser,singleUser} = require("../controllers/userContoller");

router.route("/signup").post(createUser);
router.route("/login").post(signIn);
router.route("/alluser/users").get(getAllUser);
router.route("/user/action/:id").delete(deleteOne).put(editUser).get(singleUser);

module.exports = router