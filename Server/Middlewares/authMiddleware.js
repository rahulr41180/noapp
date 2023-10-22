
const JWT = require("jsonwebtoken");

const userModel = require("../models/userModel.js");

// Protected Routes Token Based
const requireSignIn = async (req, res, next) => {
    try {
        // console.log('req.headers.authorization:', req.headers.authorization)
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        // console.log('decode:', decode);
        req.user = decode;

        next();
    } catch (error) {
        return res.status(404).send({
            status : false,
            message : "Please do login to access this"
        })
    }
}


// User Validation
const isUser = async (req, res, next) => {
    try {
        // console.log('req.user._id:', req.user._id)
        const user = await userModel.findById(req.user._id);
        // console.log('user:', user)
        if(user.role !== 0) {
            // console.log('user.role:', user.role)
            return res.status(401).send({

                status : false,
                navigate : "/",
                protected : false,
                message : "UnAuthorized Access..",
            })
        } else {
            next();
        }
    } catch(error) {

        return res.status(500).send({
            status : false,
            error_isUser : error.message,
            message : "Something went wrong! Please try again.."
        })
    }
}

// Protected Role For Admin Access

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        // console.log('user:', user)
        if(user.role !== 1) {
            return res.status(401).send({
                status : false,
                message : "UnAuthorized access"
            })

        } else {
            next();
        }
    } catch (error) {
        return res.status(404).send({
            status : false,
            message : "Something went wrong ! Please try again.."
        })
    }
    
}

module.exports = {
    requireSignIn,
    isAdmin,
    isUser
}