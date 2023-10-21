
const productModel = require("../models/productDetailsModel.js");

const csv = require("csvtojson");

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
        // console.log("req.results :", req.results)
        // const jsonArray = await csv().fromFile(req.file.path);
        const products = await productModel.insertMany(req.results);

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