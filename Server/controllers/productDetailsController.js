
const productModel = require("../models/productDetailsModel.js");

const csvToJson = require("csvtojson");

const productDetails = async (req, res) => {

    try {

        res.status(200).send({
            status : true
        })

    } catch(error) {
        res.status(500).send({
            status : false
        })
    }

}

const productDetailsUpload = async (req, res) => {

    try {
        console.log('req.file:', req.file)
        if(!req.file) {
            return res.status(400).send({
                status : false,
                message : "No file present for uploading....."
            })
        }
        const jsonArray = await csvToJson().fromFile(req.file.path);

        const products = await productModel.insertMany(jsonArray);

        return res.status(200).send({
            status : true,
            result : products
        })
    } catch(error) {
        res.status(500).send({
            status : false,
            error : error.message
        })
    }

}

module.exports =  {
    productDetails,
    productDetailsUpload
}