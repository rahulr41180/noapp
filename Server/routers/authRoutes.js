
const express = require("express");

// router object
const router = express.Router();

const { 
registerController, 
loginController, 
} = require("../controllers/authController.js");

// routing 

// Register || Method : POST
router.post("/register", registerController);

// Login || Method : POST
router.post("/login", loginController);

module.exports = router;