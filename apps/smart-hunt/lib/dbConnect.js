import { Client } from 'pg';

export default async function connectToDB() {
  // Define a configuration object for the connection
  const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'smart_hunt',
    port: 5432,
  };

  // Create a new instance of the Client class
  const client = new Client(config);

  // Connect to the database
  client
    .connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Could not connect to the database', err));
}
