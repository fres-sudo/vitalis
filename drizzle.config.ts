import type { Config } from "drizzle-kit";

export default {
  out: "./src/lib/server/api/infrastructure/database/migrations",
  schema: "./src/lib/tables/*.table.ts",
  breakpoints: false,
  strict: true,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: "migrations",
    schema: "public",
  },
  verbose: true,
} satisfies Config;
