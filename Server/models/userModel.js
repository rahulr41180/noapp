
const mongoose = require("mongoose");

// User Schema

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true, // from triming the white space
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : Number,
        default : 0
    }
},{
    timestamps : true
});

module.exports = mongoose.model("users", userSchema);