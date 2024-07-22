import { relations } from "drizzle-orm";
import { citext, timestamps } from "../utils";
import { createId } from "@paralleldrive/cuid2";
import { sessionsTable } from "./sessions.table";
import {
  boolean,
  pgTable,
  text,
  varchar,
  pgEnum,
  date,
  integer,
} from "drizzle-orm/pg-core";
import { emailVerificationsTable } from "./email-verifications.table";
import { addressesTable } from "./addresses.table";

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
  birthdate: date("birthdate"),
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
}));
