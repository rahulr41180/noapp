
// const express = require("express");

// module based / ES6 Based
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Configure .env file
dotenv.config();


// rest object for making API
const app = express();

// rest APIs
// middlewares

app.use(cors());
app.use(express.json());


// routes
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

// PORT
const PORT = process.env.PORT || 8080;

// Funtion for run the server

app.listen(PORT, async () => {
    try {
        console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}.....`);

        await connectDB();

    } catch (error) {

        console.log(`Error in server connection on port ${PORT} :`, error);

    }
})