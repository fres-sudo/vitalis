import { pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";

export const receptionistsTable = pgTable("receptionists", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id),
});
