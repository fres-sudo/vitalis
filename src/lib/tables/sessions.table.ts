import { cuid2 } from "./utils";
import { usersTable } from "./users.table";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const sessionsTable = pgTable("sessions", {
  id: cuid2("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionRelationships = relations(
  sessionsTable,
  ({ many, one }) => ({
    users: one(usersTable, {
      fields: [sessionsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
