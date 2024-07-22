DO $$ BEGIN
 CREATE TYPE "public"."relationship" AS ENUM('UNKNOWN', 'MOTHER', 'FATHER', 'SISTER', 'BROTHER', 'SON', 'DAUGHTER', 'GRANDMOTHER', 'GRANDFATHER', 'GRANDSON', 'GRANDDAUGHTER', 'AUNT', 'UNCLE', 'COUSIN', 'NIECE', 'NEPHEW', 'WIFE', 'HUSBAND', 'MOTHER-IN-LAW', 'FATHER-IN-LAW', 'SISTER-IN-LAW', 'BROTHER-IN-LAW');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'NOT_DEFINED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('DOCTOR', 'RECEPTIONIST', 'PATIENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "addresses" (
	"id" text PRIMARY KEY NOT NULL,
	"street" varchar(255) NOT NULL,
	"houseNumber" integer DEFAULT 1 NOT NULL,
	"cityId" text NOT NULL,
	"zip" char(6)
);

CREATE TABLE IF NOT EXISTS "appointments" (
	"id" text PRIMARY KEY NOT NULL,
	"patientId" text NOT NULL,
	"doctorId" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"reason" varchar(100) DEFAULT 'Generic Visit' NOT NULL,
	"notes" text
);

CREATE TABLE IF NOT EXISTS "cities" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"shortName" char(2) NOT NULL,
	"countryId" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "countries" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"shortName" varchar(5)
);

CREATE TABLE IF NOT EXISTS "doctors" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"receptionistId" text NOT NULL,
	"specialization" varchar(255) DEFAULT 'Generic' NOT NULL
);

CREATE TABLE IF NOT EXISTS "emergencyContatcts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"suername" varchar(255) NOT NULL,
	"email" "citext",
	"phoneNumber" varchar(15) NOT NULL,
	"relationship" "relationship" DEFAULT 'UNKNOWN'
);

CREATE TABLE IF NOT EXISTS "medicalHistories" (
	"id" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"description" varchar(255) NOT NULL,
	"notes" varchar(500)
);

CREATE TABLE IF NOT EXISTS "patients" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"doctorId" text NOT NULL,
	"emergencyContact" text
);

CREATE TABLE IF NOT EXISTS "receptionists" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL
);

ALTER TABLE "users" ADD COLUMN "name" varchar(100) NOT NULL;
ALTER TABLE "users" ADD COLUMN "surname" varchar(100) NOT NULL;
ALTER TABLE "users" ADD COLUMN "gender" "gender" DEFAULT 'NOT_DEFINED' NOT NULL;
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'PATIENT' NOT NULL;
ALTER TABLE "users" ADD COLUMN "birthdate" date;
ALTER TABLE "users" ADD COLUMN "address" text;
ALTER TABLE "users" ADD COLUMN "phoneNumber" integer;
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_cityId_cities_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_patients_id_fk" FOREIGN KEY ("patientId") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_doctors_id_fk" FOREIGN KEY ("doctorId") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_countries_id_fk" FOREIGN KEY ("countryId") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "doctors" ADD CONSTRAINT "doctors_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "doctors" ADD CONSTRAINT "doctors_receptionistId_receptionists_id_fk" FOREIGN KEY ("receptionistId") REFERENCES "public"."receptionists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "medicalHistories" ADD CONSTRAINT "medicalHistories_id_patients_id_fk" FOREIGN KEY ("id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_doctorId_users_id_fk" FOREIGN KEY ("doctorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_emergencyContact_emergencyContatcts_id_fk" FOREIGN KEY ("emergencyContact") REFERENCES "public"."emergencyContatcts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "receptionists" ADD CONSTRAINT "receptionists_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_address_addresses_id_fk" FOREIGN KEY ("address") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
