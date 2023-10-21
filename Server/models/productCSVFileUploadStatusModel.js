
const mongoose = require("mongoose");

const csvFileUploadStatus = new mongoose.Schema({
    csvFileName : {
        type : String,
        required : true,
    },
    uploadStatus : {
        type : Boolean,
        default : false
    }

})

module.exports = mongoose.model("csvfileuploadstatus", csvFileUploadStatus);