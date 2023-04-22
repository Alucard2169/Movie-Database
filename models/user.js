import mongoose from "mongoose";
import { connectToDatabase } from "@/libs/database";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({ username: 1, email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
