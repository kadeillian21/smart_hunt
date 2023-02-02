import { PoolClient } from "pg";
import connectToDB from "../../../lib/connectToDB";

export default async function handler(req, res) {
  const client: PoolClient = await connectToDB();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const result = await client.query(
          `SELECT * FROM bighorn_sheep WHERE id = $1`,
          [id]
        );
        const bighorn_sheep = result.rows[0];
        res.status(200).json({ success: true, data: bighorn_sheep });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const result = await client.query(
          `UPDATE bighorn_sheep SET name=$1, weight=$2 WHERE id = $3`,
          [req.body.name, req.body.weight, id]
        );
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const result = await client.query(
          `DELETE FROM bighorn_sheep WHERE id = $1`,
          [id]
        );
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

  client.release();
}
