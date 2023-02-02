import connectToDB from "../../../lib/connectToDB";

export default async function handler(req, res) {
  const client = await connectToDB();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const result = await client.query("SELECT * FROM mule_deer");
        const mule_deers = result.rows;
        res.status(200).json({ success: true, data: mule_deers });
      } catch (error) {
        console.error("Error querying mule_deer table: ", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name, weight, location } = req.body;
        const result = await client.query(
          "INSERT INTO mule_deer (name, weight, location) VALUES ($1, $2, $3)",
          [name, weight, location]
        );
        res.status(201).json({ success: true });
      } catch (error) {
        console.error("Error inserting into mule_deer table: ", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

  client.release();
}
