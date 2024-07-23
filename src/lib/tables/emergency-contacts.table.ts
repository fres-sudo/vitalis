import { pgTable, varchar, text, pgEnum } from "drizzle-orm/pg-core";
import { citext } from "./utils";
import { createId } from "@paralleldrive/cuid2";
import { usersTable } from "./users.table";
import { relations } from "drizzle-orm";
import { patientsTable } from "./patients.table";

export const relationship = pgEnum("relationship", [
  "UNKNOWN",
  "MOTHER",
  "FATHER",
  "SISTER",
  "BROTHER",
  "SON",
  "DAUGHTER",
  "GRANDMOTHER",
  "GRANDFATHER",
  "GRANDSON",
  "GRANDDAUGHTER",
  "AUNT",
  "UNCLE",
  "COUSIN",
  "NIECE",
  "NEPHEW",
  "WIFE",
  "HUSBAND",
  "MOTHER-IN-LAW",
  "FATHER-IN-LAW",
  "SISTER-IN-LAW",
  "BROTHER-IN-LAW",
]);

export const emergencyContactsTable = pgTable("emergencyContatcts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  surname: varchar("suername", { length: 255 }).notNull(),
  email: citext("email", { length: 100 }),
  phoneNumber: varchar("phoneNumber", { length: 15 }).notNull(),
  relationship: relationship("relationship").default("UNKNOWN"),
});

export const emergencyContactsRelationship = relations(
  emergencyContactsTable,
  ({ many, one }) => ({
    patients: many(patientsTable),
  }),
);
