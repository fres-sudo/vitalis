ALTER TABLE "patients" RENAME COLUMN "emergencyContact" TO "emergencyContactId";
ALTER TABLE "patients" DROP CONSTRAINT "patients_emergencyContact_emergencyContatcts_id_fk";

ALTER TABLE "users" ALTER COLUMN "birthdate" SET DATA TYPE timestamp;
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_emergencyContactId_emergencyContatcts_id_fk" FOREIGN KEY ("emergencyContactId") REFERENCES "public"."emergencyContatcts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
