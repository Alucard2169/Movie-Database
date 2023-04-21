import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  if (!mongoose.connection) {
    await mongoose.connect(MONGODB_URI);
  } else if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }

  return mongoose.connection;
};
