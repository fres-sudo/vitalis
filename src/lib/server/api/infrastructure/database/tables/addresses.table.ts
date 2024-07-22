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

export const addressesTable = pgTable("addresses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  street: varchar("street", { length: 255 }).notNull(),
  houseNumber: integer("houseNumber").notNull().default(1),
  cityId: text("cityId")
    .notNull()
    .references(() => citiesTable.id),
  zip: char("zip", { length: 6 }),
});
