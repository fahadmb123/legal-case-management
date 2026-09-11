import "dotenv/config";

import { definePrismaConfig } from "prisma/config";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

const config: Parameters<typeof definePrismaConfig>[0] = {
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: process.env["DATABASE_URL"]!,
    },
  }),
};

export default definePrismaConfig(config);