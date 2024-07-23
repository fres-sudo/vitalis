import {
  pgTable,
  integer,
  text,
  varchar,
  char,
  serial,
} from "drizzle-orm/pg-core";
import { citiesTable } from "./cities.table";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { usersTable } from "./users.table";

export const addressesTable = pgTable("addresses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  street: varchar("street", { length: 255 }).notNull(),
  houseNumber: integer("houseNumber"),
  cityId: text("cityId")
    .notNull()
    .references(() => citiesTable.id),
  zip: integer("zip"),
});

export const addresseRelationships = relations(
  addressesTable,
  ({ many, one }) => ({
    cities: one(citiesTable, {
      fields: [addressesTable.cityId],
      references: [citiesTable.id],
    }),
    users: many(usersTable),
  }),
);
