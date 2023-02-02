import { Client, Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://localhost:5432/smart_hunt_development';

const pool = new Pool({
  connectionString,
});

export default async function connectToDB() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Error connecting to database: ', error);
    throw error;
  }
}
