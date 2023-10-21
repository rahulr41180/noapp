
const express = require("express");

const router = express.Router();
const { productDetails, productDetailsUpload } = require("../controllers/productDetailsController.js");
const { csvFileValidationMiddleware } = require("../Middlewares/csvFileValidationMiddleware.js");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for CSV file uploads
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        // Set the filename for uploaded files
        cb(null, file.originalname);
    },
});

const upload = multer({ storage : storage });

// Getting Data || METHOD : GET

router.get("/all-products/:page/:items", productDetails);

// Storing Data || METHOD : POST
router.post("/details-upload", upload.single("csvFile"), csvFileValidationMiddleware, productDetailsUpload);

module.exports =  router;