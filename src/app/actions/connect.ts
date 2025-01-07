import mongoose from "mongoose";

let isConnected = false;

 async function connect() {
  if (isConnected) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Already connected to MongoDB");
    }
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL!);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
}
export default connect;