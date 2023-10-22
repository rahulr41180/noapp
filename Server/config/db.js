
const mongoose = require("mongoose");

// Data Base Connection

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        
        console.log(`Sucessful database has been connected.....`);

    } catch(error) {
        console.log(`Error in database connection : ${error}`);
    }

}

module.exports = connectDB