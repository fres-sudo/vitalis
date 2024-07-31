import { relations } from "drizzle-orm";
import { citext, timestamps } from "./utils";
import { createId } from "@paralleldrive/cuid2";
import { sessionsTable } from "./sessions.table";
import {
  boolean,
  pgTable,
  text,
  varchar,
  pgEnum,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { emailVerificationsTable } from "./email-verifications.table";
import { addressesTable } from "./addresses.table";
import { doctorsTable } from "./doctors.table";
import { patientsTable } from "./patients.table";
import { receptionistsTable } from "./receptionists.table";
import { appointmentsTable } from "./appointments.table";
import { medicalHistoriesTable } from "./medical-histories.table";
import { emergencyContactsTable } from "./emergency-contacts.table";
import { passwordResetTable } from "./password-reset.table";
import { oAuthTable } from "./oauth.table";

export const gender = pgEnum("gender", ["MALE", "FEMALE", "NOT_DEFINED"]);
export const role = pgEnum("role", ["DOCTOR", "RECEPTIONIST", "PATIENT"]);

export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 100 }).notNull(),
  surname: varchar("surname", { length: 100 }).notNull(),
  gender: gender("gender").notNull().default("NOT_DEFINED"),
  role: role("role").notNull().default("PATIENT"),
  birthdate: timestamp("birthdate"),
  address: text("address").references(() => addressesTable.id),
  phoneNumber: integer("phoneNumber"),
  avatar: text("avatar"),
  email: citext("email").notNull().unique(),
  verified: boolean("verified").notNull().default(false),
  password: text("password").notNull(),
  ...timestamps,
});

export const usersRelations = relations(usersTable, ({ many, one }) => ({
  sessions: many(sessionsTable),
  emailVerifications: one(emailVerificationsTable, {
    fields: [usersTable.id],
    references: [emailVerificationsTable.userId],
  }),
  passwordResetTokens: one(passwordResetTable, {
    fields: [usersTable.id],
    references: [passwordResetTable.userId],
  }),
  doctors: one(doctorsTable, {
    fields: [usersTable.id],
    references: [doctorsTable.userId],
  }),
  patients: one(patientsTable, {
    fields: [usersTable.id],
    references: [patientsTable.userId],
  }),
  receptionists: one(receptionistsTable, {
    fields: [usersTable.id],
    references: [receptionistsTable.userId],
  }),
  address: one(addressesTable, {
    fields: [usersTable.address],
    references: [addressesTable.id],
  }),
  oAuths: one(oAuthTable, {
    fields: [usersTable.id],
    references: [oAuthTable.userId],
  }),
}));
