const express = require("express");

const router = express.Router();

// importing all controllers
const {createUser, signIn, getAllUser,deleteOne,editUser} = require("../controllers/userContoller");

router.route("/signup").post(createUser);
router.route("/login").post(signIn);
router.route("/alluser/users").get(getAllUser);
router.route("/user/action/:id").delete(deleteOne).put(editUser);

module.exports = router