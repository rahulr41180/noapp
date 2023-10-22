
const productModel = require("../models/productDetailsModel.js");

const csvfileUploadModel = require("../models/productCSVFileUploadStatusModel.js");

const csv = require("csvtojson");

const totalProductCount = async (req, res) => {

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

            // totalProducts : totalProducts
        })

    } catch(error) {
        res.status(500).send({
            status : false
        })
    }

}


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

            // totalProducts : totalProducts
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
        console.log("req.file :", req.file);
        // const jsonArray = await csv().fromFile(req.file.path);
        const products = await productModel.insertMany(req.results);


        // Uploading CSV File In Database With Status As True

        const csvFileUploadStatus = await csvfileUploadModel.create({
            csvFileName : req.file.filename,
            uploadStatus : true,
        })

        return res.status(200).send({
            status : true,
            result : products,
            csvFileUploadStatus : csvFileUploadStatus,
            
            message : "CSV file data has been processed and uploaded successfully",
            navigate : "/"
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
    unitTestingProductDetailsUpload,
    totalProductCount
}