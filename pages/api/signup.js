import { signUp } from "@/models/user";

export default async function handler(req, res) {
  const { username, email, password } = req.body;

  try {
    const data = await signUp({ username, email, password });

    if (data.code === 11000) {
      let obj = data.keyPattern;
      throw new Error(`${Object.keys(obj)[0]} already exists`);
    }
    res.status(201).json(data);
  } catch (error) {
    console.log(error); // Log the error to the console
    res.status(500).json({ error: error.message }); // Return the error message in the response
  }
}
