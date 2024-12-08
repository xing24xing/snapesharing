import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Using mongoose.connect with additional options for a more reliable connection
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,      // Parses MongoDB connection URL in a more flexible manner
            useUnifiedTopology: true,  // Ensures compatibility with the latest MongoDB server versions
            useFindAndModify: false,   // Avoids deprecation warnings on 'findAndModify'
            useCreateIndex: true,      // Helps with creating indexes for your collections
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message); // Log detailed error message
        process.exit(1); // Exit process with a failure code if database connection fails
    }
};

export default connectDB;
