import { login } from "@/models/user";

export default async function handler(req, res) {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await login({ name: username, email: "hello#gmai", password });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
}
