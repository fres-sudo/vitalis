import { text, primaryKey, pgTable } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";
import { relations } from "drizzle-orm";

export const oAuthTable = pgTable(
  "oAuths",
  {
    providerId: text("providerId").notNull(),
    providerUserId: text("providerUserId").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
    };
  },
);

export const oAuthRelationships = relations(oAuthTable, ({ many, one }) => ({
  users: one(usersTable, {
    fields: [oAuthTable.userId],
    references: [oAuthTable.id],
  }),
}));
