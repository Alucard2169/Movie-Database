import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);

  const data = await db.collection("yourCollection").find().toArray();

  res.status(200).json({ data });
}
