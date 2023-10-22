
const express = require("express");

const router = express.Router();

const { gettingCSVFiles } = require("../controllers/productCSVFileUploadStatusController.js");

// Getting All CSV Files And Thier Status

router.get("/all-csv-files", gettingCSVFiles);

module.exports = router;