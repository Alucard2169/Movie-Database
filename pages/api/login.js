import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { username, password, remember } = req.body;

  try {
    if (!username || !password) {
      throw new Error("username and password are required");
    }

    // Find a single user directly using findOne
    const user = await User.findOne({ username }).select(
      "username email password"
    );

    if (!user) {
      throw new Error("user not found");
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // If password matches, set up a new token using user's id
      if (remember) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // Set the token
        setCookie("token", token, {
          req,
          res,
          maxAge: 4 * 24 * 60 * 60, // 4 days in seconds
          path: "/",
          secure: process.env.NODE_ENV === "production", // Set to true in production
          httpOnly: true,
          sameSite: "strict",
        });
      }

      // Return only the required user data
      const userData = {
        username: user.username,
        email: user.email,
        id: user._id,
      };
      res.status(200).json({ user: userData });
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
