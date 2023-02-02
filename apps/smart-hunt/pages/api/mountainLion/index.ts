import { Client } from "pg/lib";
import connectToDB from "../../../lib/connectToDB";

export default async function handler(req, res) {
  const client = await connectToDB();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const result = await client.query("SELECT * FROM mountain_lion");
        const mountain_lions = result.rows;
        res.status(200).json({ success: true, data: mountain_lions });
      } catch (error) {
        console.error("Error querying mountain_lion table: ", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name, weight, location } = req.body;
        const result = await client.query(
          "INSERT INTO mountain_lion (name, weight, location) VALUES ($1, $2, $3)",
          [name, weight, location]
        );
        res.status(201).json({ success: true });
      } catch (error) {
        console.error("Error inserting into mountain_lion table: ", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

  client.release();
}
