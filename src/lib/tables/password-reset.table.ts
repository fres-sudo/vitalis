import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersTable } from "./users.table";
import { timestamps } from "./utils";

export const passwordResetTable = pgTable("passwordResetTable", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  hashedToken: text("hashed_token").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id)
    .unique(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  ...timestamps,
});

export const passwordResetRelationships = relations(
  passwordResetTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [passwordResetTable.userId],
      references: [usersTable.id],
    }),
  }),
);
