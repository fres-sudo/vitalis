import { pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { patientsTable } from "./patients.table";
import { createId } from "@paralleldrive/cuid2";

export const medicalHistoriesTable = pgTable("medicalHistories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  patientId: text("id")
    .notNull()
    .references(() => patientsTable.id),
  date: timestamp("date").notNull().defaultNow(),
  description: varchar("description", { length: 255 }).notNull(),
  notes: varchar("notes", { length: 500 }),
});