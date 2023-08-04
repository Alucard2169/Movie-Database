import { connectToDatabase } from "@/libs/database";
import { User } from "@/models/user";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    // Get the token from the browser
    const token = getCookie("token", { req });

    if (!token) {
      return;
    }

    // Verify the token and extract the userId
    let userId;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      userId = decodedToken.userId;
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Find the user in the database by their _id
    const userData = await User.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({
        error: "User doesn't exist in the database, try signing up",
      });
    }

    const user = {
      username: userData.username,
      email: userData.email,
      id: userData._id.toString(),
    };

    // Send back the response
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
