
const express = require("express");

const router = express.Router();
const { productDetails, productDetailsUpload } = require("../controllers/productDetailsController.js");
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

router.get("/details", productDetails);


router.post("/details-upload", upload.single("csvFile") , productDetailsUpload);

module.exports =  router;