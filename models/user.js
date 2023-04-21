import mongoose from "mongoose";
import { connectToDatabase } from "@/libs/database";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

const login = async (params) => {
  try {
    const { name, email, password } = params;

    await connectToDatabase();

    const user = new User({ name, email, password });
    await user.save();

    return user;
  } catch (err) {
    console.log(err);
  }
};

export { login };
