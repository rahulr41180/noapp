
const userModel = require("../models/userModel.js");

const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");

// POST METHOD FOR REGISTRATION
const registerController = async (req, res) => {
    try {
        // console.log('req.body:', req.body)
        const { name, email, password } = req.body;
        // validation

        if(!name) {
            return res.status(404).send({
                status : false,
                message : "Name is required",
                navigate : "/register"
            })
        }
        if(!email) {
            return res.status(404).send({

                message : "email is required",
                status : false,
                navigate : "/register"
            })
        }
        if(!password) {
            return res.status(404).send({
                message : "password is required",
                status : false,

                navigate : "/register"
            })
        }

        // Checking. She/He is exisiting user.
        const exisitingUser = await userModel.findOne({email})
        if(exisitingUser) {
            return res.status(200).send({
                status : false,
                message : "Already user has been registered please login..",
                navigate : "/login",
            })
        }


        // User registration

        // Password hashing
        const hashedPassword = await hashPassword(password);

        console.log("hashedPassword :", hashedPassword);
        // Save
        const user = await new userModel({name, email, password : hashedPassword}).save();
        console.log("user", user);


        res.status(201).send({
            message : "User registered successfully",
            user : user,
            status : true,
            navigate : "/login"
        })

    } catch (error) {
        console.log("error in registerController :", error);
        res.status(500).send({
            message : "Something went wrong, Please try again",
            devMessage : "Error in user registration",
            status : false,
            errorMessage : error.message,
            navigate : "/register"
        })
    }

}

// METHOD POST FOR LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('password:', password)
        console.log('email:', email)
        // Validation

        if(!email || !password) {
            return res.status(201).send({
                status : false,
                message : "Please enter email or password",
                navigate : "/login"
            })
        }

        // Check User is exists or not

        const user = await userModel.findOne({email : email});
        // console.log('user:', user)
        if(!user) {
            // console.log('user:', user)
            return res.status(201).send({
                status : false,
                message : "User is not registered, Please do register your self first..",
                navigate : "/register"
            })
        }

        // Password Verification
        const match = await comparePassword(password, user.password);

        if(!match) {
            return res.status(201).send({
                status : false,
                message : "Invalid email or password, Please try again..",
                navigate : "/login"
            })
        }
        
        // Token
        const token = await JWT.sign({_id : user._id}, process.env.JWT_SECRET, {
            expiresIn : "7d",
        })

        res.status(200).send({
            status : true,
            message : "Login has successfully done.",
            user : {

                name : user.name,
                email : user.email,
                address : user.address,
                phone : user.phone,
                role : user.role
            },
            token : token,

            navigate : "/"
        })
    } catch (error) {
        res.status(500).send({
            status : false,
            message : "Something went wrong ! Please try again..",
            devMessage : error.message,
            navigate : "/login"
        })
    }
}

module.exports = { 
registerController, 
loginController, 

};