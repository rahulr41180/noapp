
const mongoose = require("mongoose");

const productDetails = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true, // from triming the white space
    },
    desc : {
        type : String,
        required : true,

    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },

    type : {
        type : String,
        required : true,
    },
    brand : {
        type : String,
        required : true,
    },
    discount_price : {
        
        type : Number,
        default : 0
    },
    rating : {
        type : Number,
        default : 1
    },
    image_url : {
        type : String

    }
})

module.exports = mongoose.model("product", productDetails);