import { PrismaClient } from './src/prisma/contract.js';
const prisma = new PrismaClient();
async function main() {
  await prisma.$executeRawUnsafe('ALTER TABLE "User" ADD COLUMN "profilePhoto" TEXT;');
  console.log('Done!');
}
main().catch(console.error).finally(() => prisma.$disconnect());
