
const assert = require("chai").assert;

const { validateCSVData } = require("../Middlewares/csvFileValidationMiddleware.js");
const { unitTestingProductDetailsUpload } = require("../controllers/productDetailsController.js");

// Unit Testing For Validation Of CSV Data Fields;

describe("Validation Process", () => {
    it("should validate CSV data correctly", () => {
        const validData = {
            name: "New Shirt",

            desc: "This is a shirt",
            price: 600,
            category: "Women",
            type: "top wear",
            brand: "rebook",
            discount_price: 150,
            rating: 3,
            image_url: "",
        }
        
        const inValidData = {
            name: "New Shirt",
            desc: "This is a shirt",
            price: "600",
            category: "",
            type: "top wear",
            brand: "rebook",
            discount_price: 150,
            rating: 3,
            image_url: "",
        }

        assert.isTrue(validateCSVData(validData).isValid);
        assert.isFalse(validateCSVData(inValidData).isValid);
    })
});

// Unit Testing For Data Storage Mechanism
describe("Data Storage Mechanism", function() {

    it("should save valid data to MongoDB Database", function(done) {
        // this.timeout(5000);
        const validData = [
            {
                name: "New Shirt",
                desc: "This is a shirt",
                price: 600,
                category: "Women",
                type: "top wear",
                brand: "rebook",
                discount_price: 150,
                rating: 3,
                image_url: "",
            }
        ]
        unitTestingProductDetailsUpload(validData)
        .then(() => {
            done();
        })
        .catch((error) => {

            done(error);
        })
    })
})