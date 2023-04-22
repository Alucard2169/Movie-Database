import { deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  try {
    deleteCookie("token", { req, res });

    res.status(200).json({ message: "Successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
