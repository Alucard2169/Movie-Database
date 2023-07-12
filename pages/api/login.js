import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  const { username, password,remember } = req.body;

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
      
      // make a seperate data object to send as a response
      const data = { username: user.username, email: user.email, id: user._id };
      if (remember) {
        // if password matches, set up a new token using user's id
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // set the token
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

      //send response
      res.status(200).json({ user: data });
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
