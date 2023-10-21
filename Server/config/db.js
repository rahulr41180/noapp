
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        
        console.log(`Sucessful database has been connected.....`);

    } catch(error) {
        console.log(`Error in database connection : ${error}`);
    }
}

export { connectDB };