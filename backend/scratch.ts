import { db } from "./src/prisma/db";

async function main() {
    console.log(db.orm.public.User.where);
    console.log(db.orm.public.User.update);
}

main().catch(console.error);
