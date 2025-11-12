import mongoose from "mongoose";

//mongodb+srv://zhiweitan:admin@cluster0.a02vh9j.mongodb.net/?appName=Cluster0

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed", err.message);
    process.exit(1);
  }
};
