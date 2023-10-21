
import express from "express";

const router = express.Router();
import { productDetailsFromCSV } from "../controllers/productDetailsController.js";

router.get("/details-upload", productDetailsFromCSV);

export default router;