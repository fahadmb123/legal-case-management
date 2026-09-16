import pg from 'pg';
const { Client } = pg;
import 'dotenv/config';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query('ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "profilePhoto" TEXT;');
  console.log('Successfully added profilePhoto column!');
  await client.end();
}

main().catch(console.error);
