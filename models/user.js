import mongoose from "mongoose";
import { connectToDatabase } from "@/libs/database";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({ username: 1, email: 1 }, { unique: true });

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

const signUp = async (params) => {
  try {
    const { username, email, password } = params;

    if (!username || !email || !password) {
      throw new Error("username, email and password are required");
    } else if (!validator.isEmail(email)) {
      throw new Error("Must be a valid email");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough");
    } else {
      const saltRound = 10;

      const hashPassword = await bcrypt.hash(password, saltRound);

      await connectToDatabase();

      const user = new User({ username, email, password: hashPassword });
      await user.save();

      return user;
    }
  } catch (error) {
    return error;
  }
};
export { login, signUp };
