import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // No need for 'useNewUrlParser' or 'useUnifiedTopology'
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message); 
        process.exit(1); // Exit process with failure code
    }
};

export default connectDB;
