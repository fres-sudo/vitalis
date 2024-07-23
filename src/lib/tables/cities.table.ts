import {
  pgTable,
  serial,
  varchar,
  text,
  char,
  integer,
} from "drizzle-orm/pg-core";
import { countriesTable } from "./countries.table";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { addressesTable } from "./addresses.table";

export const citiesTable = pgTable("cities", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  shortName: char("shortName", { length: 2 }).notNull(),
  countryId: text("countryId")
    .notNull()
    .references(() => countriesTable.id),
});

export const cityRelationships = relations(citiesTable, ({ many, one }) => ({
  countries: one(countriesTable, {
    fields: [citiesTable.countryId],
    references: [countriesTable.id],
  }),
  addresses: many(addressesTable),
}));
