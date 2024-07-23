import { text, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";
import { receptionistsTable } from "./receptionists.table";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { patientsTable } from "./patients.table";
import { appointmentsTable } from "./appointments.table";

export const doctorsTable = pgTable("doctors", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id),
  receptionistId: text("receptionistId")
    .notNull()
    .references(() => receptionistsTable.id),
  specialization: varchar("specialization", { length: 255 })
    .notNull()
    .default("Generic"),
});

export const doctorsRelations = relations(doctorsTable, ({ many, one }) => ({
  users: one(usersTable, {
    fields: [doctorsTable.userId],
    references: [usersTable.id],
  }),
  patients: many(patientsTable),
  appointemtns: many(appointmentsTable),
  receptionists: one(receptionistsTable, {
    fields: [doctorsTable.id],
    references: [receptionistsTable.userId],
  }),
}));
