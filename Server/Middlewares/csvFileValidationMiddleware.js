
const csv = require("csv-parser");

const fs = require("fs");

let rowNumber = 0;
const csvFileValidationMiddleware = async (req, res, next) => {
    try {
        console.log('req.file:', req.file);
        if (!req.file) {
            return res.status(400).send({
                status: false,
                message: "No file present for uploading....."

            })
        }
        const results = [];
        const errorResult = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => {
                const validationResult = validateCSVData(data);
                if (validationResult.isValid) {
                    results.push(data);

                } else {
                    errorResult.push(validationResult.errorObject);

                }
            })
            .on("end", () => {
                rowNumber = 0;
                // console.log('results:', results);
                console.log('errorResult:', errorResult)

                if (errorResult.length > 0) {
                    // Unprocessable Entity
                    return res.status(422).send({
                        status: false,
                        message: errorResult
                    })
                }

                req.results = results;
                next();
            })
    } catch (error) {

    }
}

const validateCSVData = (data) => {
    // const validateErrorForEach = [];
    rowNumber++;
    console.log('data:', data)

    let flag = true;
    const errorObject = {
        missingFields: "",
        typeError: ""
    }
    if (!data.name || !data.desc || !data.price || !data.category || !data.type || !data.brand) {
        flag = false
        errorObject.missingFields = `Found some missing fields in row ${rowNumber}`
        // return {
        //     isValid : false,
        //     errorMessage : "Missing required fields.....",
        // }
    }
    if (isNaN(data.price) || isNaN(data.discount_price) || isNaN(data.rating)) {
        flag = false,
        
            errorObject.typeError = `Price, Discount_Price and Rating should be in number format for row ${rowNumber}`
        // return {
        //     isValid: false,

        //     errorMessage: "Price, Descount_Price, Rating sould be number value....."
        // }
    }

    if (!flag) {
        return {
            isValid: false,
            errorObject: { ...errorObject }
        }
    }
    return {
        isValid: true
    }

}

module.exports = {
    csvFileValidationMiddleware
}