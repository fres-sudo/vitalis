import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Discord, Google } from "arctic";
import { db } from "../database";
import { config } from "../../common/config";
import { sessionsTable, usersTable } from "$lib/tables";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: config.isProduction,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      ...attributes,
    };
  },
});

interface DatabaseUserAttributes {
  id: string;
  name: string;
  surname: string;
  address: string | null;
  birthdate: string | null;
  password: string | null;
  phoneNumber: string | null;
  gender: "MALE" | "FEMALE" | "NOT_DEFINED" | null;
  role: "PATIENT" | "DOCTOR" | "RECEPTIONIST" | null;
  email: string;
  avatar: string | null;
  verified: boolean;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
