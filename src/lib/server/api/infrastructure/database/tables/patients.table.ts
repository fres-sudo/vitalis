import { text, pgTable } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";
import { emergencyContacts } from "./emergency-contacts.table";
import { createId } from "@paralleldrive/cuid2";

export const patientsTable = pgTable("patients", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id),
  doctorId: text("doctorId")
    .notNull()
    .references(() => usersTable.id),
  emergencyContact: text("emergencyContact").references(
    () => emergencyContacts.id,
  ),
});
