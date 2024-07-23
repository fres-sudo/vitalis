import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { citiesTable } from "./cities.table";

export const countriesTable = pgTable("countries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 100 }).notNull(),
  shortName: varchar("shortName", { length: 5 }),
});

export const countryRelationships = relations(
  countriesTable,
  ({ many, one }) => ({
    cities: many(citiesTable),
  }),
);
