import { pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";
import { relations } from "drizzle-orm";
import { doctorsTable } from "./doctors.table";

export const receptionistsTable = pgTable("receptionists", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id),
});

export const receptionistRelationships = relations(
  receptionistsTable,
  ({ many, one }) => ({
    doctors: many(doctorsTable),
    users: one(usersTable, {
      fields: [receptionistsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
