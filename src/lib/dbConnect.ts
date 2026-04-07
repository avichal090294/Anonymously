import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in environment variables");
  }

  try {
    await mongoose.connect(MONGODB_URI);

    connection.isConnected = mongoose.connection.readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Database connection failed");
  }
}

export default dbConnect;