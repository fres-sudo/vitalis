import { text, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { patientsTable } from "./patients.table";
import { doctorsTable } from "./doctors.table";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const appointmentsTable = pgTable("appointments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  patientId: text("patientId")
    .notNull()
    .references(() => patientsTable.id),
  doctorId: text("doctorId")
    .notNull()
    .references(() => doctorsTable.id),
  date: timestamp("date").notNull().defaultNow(),
  reason: varchar("reason", { length: 100 }).notNull().default("Generic Visit"),
  notes: text("notes"),
});

export const appointmentRelationships = relations(
  appointmentsTable,
  ({ many, one }) => ({
    patients: one(patientsTable, {
      fields: [appointmentsTable.patientId],
      references: [patientsTable.id],
    }),
    doctors: one(doctorsTable, {
      fields: [appointmentsTable.doctorId],
      references: [doctorsTable.id],
    }),
  }),
);
