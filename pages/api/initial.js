import { connectToDatabase } from "@/libs/database";
import { User } from "@/models/user";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    // Get the token from the browser
    const token = getCookie("token", { req, res });

    if (!token) {
      throw new Error("Unauthorized action");
    }

    // Verify the token and extract the userId
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database by their _id
    const userData = await User.findOne({ _id: userId });

    if (!userData) {
      throw new Error("User doesn't exist in the database, try signing up");
    }

    const user = {
      username: userData.username,
      email: userData.email,
      id: userData._id,
    };

    // Send back the response
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
