import { User } from "@/models/user";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const token = getCookie("token", { req, res });
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = data;

      const userData = await User.findById(userId);

      if (!userData) {
        throw new Error("User doesn't exist in database, try Signing up");
      }
      const user = {
        username: userData.username,
        email: userData.email,
        id: data._id,
      };
      res.status(200).json({ user });
    } else {
      throw new Error("Unauthorized action");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
