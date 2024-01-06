import mongoose from "mongoose";

let isConnected = false; // Track the connection 

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
        process.exit(1); // Exit the process with an error code 
    }
}