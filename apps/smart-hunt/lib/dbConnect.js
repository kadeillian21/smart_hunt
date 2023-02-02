import { Client } from 'pg';

export default async function connectToDB() {
  const client = new Client({
    host: 'localhost',
    database: 'smart_hunt',
    user: 'postgres',
  });

  await client.connect();
  return { db: client };
}
