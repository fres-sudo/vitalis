import { text, pgTable } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";
import { createId } from "@paralleldrive/cuid2";
import { emergencyContactsTable } from "./emergency-contacts.table";
import { relations } from "drizzle-orm";
import { doctorsTable } from "./doctors.table";
import { appointmentsTable } from "./appointments.table";
import { medicalHistoriesTable } from "./medical-histories.table";

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
  emergencyContactId: text("emergencyContactId").references(
    () => emergencyContactsTable.id,
  ),
});

export const patientRelationships = relations(
  patientsTable,
  ({ many, one }) => ({
    users: one(usersTable, {
      fields: [patientsTable.userId],
      references: [usersTable.id],
    }),
    doctors: one(doctorsTable, {
      fields: [patientsTable.doctorId],
      references: [doctorsTable.id],
    }),
    emergencyContacts: one(emergencyContactsTable, {
      fields: [patientsTable.emergencyContactId],
      references: [emergencyContactsTable.id],
    }),
    appointments: many(appointmentsTable),
    medicalHistory: many(medicalHistoriesTable),
  }),
);
