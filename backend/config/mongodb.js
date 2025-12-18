import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DB Connected to MongoDB Compass");
        });

        await mongoose.connect("mongodb://localhost:27017/Happy", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); 
    }
};

export default connectDB;