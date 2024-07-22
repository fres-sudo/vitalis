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
