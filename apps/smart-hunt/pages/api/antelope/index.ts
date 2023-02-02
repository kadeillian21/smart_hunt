import { Client } from "pg/lib";
import connectToDB from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const db: typeof Client = await connectToDB();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const antelopes = await db
          .collection("antelopes")
          .find({})
          .toArray();
        res.status(200).json({ success: true, data: antelopes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const antelope = await db.collection("antelopes").insertOne(req.body);
        res.status(201).json({ success: true, data: antelope });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
