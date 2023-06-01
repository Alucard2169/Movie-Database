import { connectToDatabase } from "@/libs/database";
import { User } from "@/models/user";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";
export default async function handler(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("username, email and password are required");
    } else if (!validator.isEmail(email)) {
      throw new Error("Must be a valid email");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough");
    } else {
      await connectToDatabase();

      // Check if username or email already exist in the database
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        throw new Error("Username or email already taken");
      }

      const saltRound = 10;
      const hashPassword = await bcrypt.hash(password, saltRound);

      const data = new User({ username, email, password: hashPassword });
      await data.save();

      const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET);
      // Set cookie with a max age of 4 days
      setCookie("token", token, {
        req,
        res,
        maxAge: 4 * 24 * 60 * 60, // 4 days in seconds
        path: "/",
        secure: process.env.NODE_ENV === "production", // Set to true in production
        httpOnly: true,
        sameSite: "strict",
      });

      const user = { username: data.username, email: data.email, id: data._id };
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
