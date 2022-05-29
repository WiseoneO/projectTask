const express = require("express");
const verifyUser = require("../middlewares/authorize")
const router = express.Router();

const {createUser,login,createCustomer,loginCustomer,forgotPassword,resetPassword} = require("../controllers/authController/authController")


router.post("/register-newUser",createUser )
router.post("/login", login )
router.post("/forgot-password", forgotPassword );
router.put("/reset-password/:id", resetPassword );


// customer's router
router.post("/customer-register",createCustomer )
router.post("/login-customer", loginCustomer )
module.exports = router;