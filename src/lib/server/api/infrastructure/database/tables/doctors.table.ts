import { text, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";
import { receptionistsTable } from "./receptionists.table";
import { createId } from "@paralleldrive/cuid2";

export const doctorsTable = pgTable("doctors", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id),
  receptionistId: text("receptionistId")
    .notNull()
    .references(() => receptionistsTable.id),
  specialization: varchar("specialization", { length: 255 })
    .notNull()
    .default("Generic"),
});
