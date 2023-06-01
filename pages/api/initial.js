import { User } from "@/models/user";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    // get the token from the browser
    const token = getCookie("token", { req, res });

    // if token exist
    if (token) {
      // verify the token and store the result in data
      const data = jwt.verify(token, process.env.JWT_SECRET);

      // take the userId from data
      const { userId } = data;

      // find the user in database, using the userId
      const userData = await User.findById(userId);

      // check if user exists
      if (!userData) {
        throw new Error("User doesn't exist in database, try Signing up");
      }
      const user = {
        username: userData.username,
        email: userData.email,
        id: data._id,
      };

      // send back response
      res.status(200).json({ user });
    } else {
      throw new Error("Unauthorized action");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
