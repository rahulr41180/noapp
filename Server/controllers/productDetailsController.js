
const productModel = require("../models/productDetailsModel.js");

const csv = require("csvtojson");

// Getting Product Data Controller

const productDetails = async (req, res) => {

    try {
        const page = parseInt(req.params.page) || 1;
        const itemsSkip = parseInt(req.params.items) || 10;

        console.log('itemsSkip:', itemsSkip);
        console.log('page:', page);
        // Calculate the skip value based on page and itemsSkip
        const skip = (page - 1) * itemsSkip;
        const products = await productModel.find().skip(skip).limit(itemsSkip);

        res.status(200).send({
            status : true,
            products : products,

            totalProduct : products.length
        })

    } catch(error) {
        res.status(500).send({
            status : false
        })
    }

}

const unitTestingProductDetailsUpload = async (data) => {

    console.log('data:', data)

    try {
        await productModel.insertOne(data);
    } catch(error) {
        res.status(500).send({
            status : false,
            error : error.message
        })
    } finally {
        process.exit(0);
    }

}


const productDetailsUpload = async (req, res) => {

    try {
        // console.log("req.results :", req.results)
        // const jsonArray = await csv().fromFile(req.file.path);
        const products = await productModel.insertMany(req.results);

        return res.status(200).send({
            status : true,
            result : products,
            message : "CSV file data has been processed and uploaded successfully"
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

    productDetailsUpload,
    unitTestingProductDetailsUpload
}