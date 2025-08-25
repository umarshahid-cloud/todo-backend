import mongoose from "mongoose";

export async function connectDB(uri: string): Promise<void> {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); 
  }
}
