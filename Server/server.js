
// const express = require("express");

// module based / ES6 Based
const express = require("express");
const cors =  require("cors");
const connectDB =  require("./config/db.js");
const dotenv =  require("dotenv");
const path =  require("path");
const bodyParser =  require("body-parser");

// Configure .env file
dotenv.config();


// rest object for making API
const app = express();

// rest APIs
// middlewares

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.resolve(__dirname, "public")));


// Router Importing
const productDetailsRouter = require("./routers/productDetailsRoute.js");
const csvFilesRouter = require("./routers/productCSVFileUploadStatusRouter.js");
const authRoutes = require("./routers/authRoutes.js");


// routes
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})
app.use("/api/auth", authRoutes);
app.use("/api/product", productDetailsRouter);
app.use("/api/csv", csvFilesRouter);

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