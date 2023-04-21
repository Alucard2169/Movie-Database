import { signUp } from "@/models/user";

export default async function handler(req, res) {
  const { username, email, password } = req.body;

  try {
    const data = await signUp({ username, email, password });
    res.status(201).json(data);
  } catch (error) {
    console.log(error); // Log the error to the console

    if (error.code === 11000) {
      let obj = error.keyPattern;
      res.status(400).json({ error: `${Object.keys(obj)[0]} already exists` }); // Return a 400 Bad Request error with the error message
    } else {
      res.status(500).json({ error: error.message }); // Return a 500 Internal Server Error with the error message
    }
  }
}
