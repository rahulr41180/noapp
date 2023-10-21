
const express = require("express");

const router = express.Router();

const { gettingCSVFiles } = require("../controllers/productCSVFileUploadStatusController.js");

router.get("/all-csv-files", gettingCSVFiles);

module.exports = router;