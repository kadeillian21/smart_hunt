import connectToDB from "../../../lib/connectToDB";

export default async function handler(req, res) {
  const client = await connectToDB();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const result = await client.query("SELECT * FROM bighorn_sheep_boone_and_crockett");
        const bighorn_sheep_boone_and_crocketts = result.rows;
        res.status(200).json({ success: true, data: bighorn_sheep_boone_and_crocketts });
      } catch (error) {
        console.error("Error querying bighorn_sheep_boone_and_crockett table: ", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name, weight, location } = req.body;
        const result = await client.query(
          "INSERT INTO bighorn_sheep_boone_and_crockett (name, weight, location) VALUES ($1, $2, $3)",
          [name, weight, location]
        );
        res.status(201).json({ success: true });
      } catch (error) {
        console.error("Error inserting into bighorn_sheep_boone_and_crockett table: ", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

  client.release();
}
