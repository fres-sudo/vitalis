import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const countriesTable = pgTable("countries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 100 }).notNull(),
  shortName: varchar("shortName", { length: 5 }),
});
