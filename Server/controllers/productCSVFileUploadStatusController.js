
const csvFileUploadModel = require("../models/productCSVFileUploadStatusModel.js");

// Getting CSV Files Upload Status

const gettingCSVFiles = async (req, res) => {
    try {
        const csvFiles = await csvFileUploadModel.find();

        return res.status(200).send({
            status : true,
            csvFiles : csvFiles
        })

    } catch(error) {
        return res.status(500).send({
            status : false,
            message : error.message
        })
    }
}


module.exports = {
    gettingCSVFiles
}