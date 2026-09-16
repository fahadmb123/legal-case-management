import { db } from './src/prisma/db.js';

async function main() {
  await db.sql`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "profilePhoto" TEXT;`;
  console.log('Done!');
}
main().catch(console.error);
