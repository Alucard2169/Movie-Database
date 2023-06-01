import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error("username and password are required");
    }

    // check if user is in database using username
    const users = await User.find({ username });

    if (users.length === 0) {
      throw new Error("user not found");
    }

    const user = users[0];
    // verify password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const data = { username: user.username, email: user.email, id: user._id };
      const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET);

      setCookie("token", token, {
        req,
        res,
        maxAge: 4 * 24 * 60 * 60, // 4 days in seconds
        path: "/",
        secure: process.env.NODE_ENV === "production", // Set to true in production
        httpOnly: true,
        sameSite: "strict",
      });
      res.status(200).json({ user: data });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
