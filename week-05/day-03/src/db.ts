import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;

    if (!dbURI) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }

    await mongoose.connect(dbURI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error closing MongoDB connection", error);
  }
};

export { connectDB, disconnectDB };
