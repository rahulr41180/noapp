
const mongoose = require("mongoose");

// CSV File Upload Status Schema
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